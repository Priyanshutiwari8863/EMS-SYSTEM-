import { useEffect, useState } from "react";
import api from "../api/axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./SalarySlip.css";
import { COMPANY } from "./config/company";

export default function SalarySlip() {
  const [slips, setSlips] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const loadSalarySlips = async () => {
    try {
      // Fetch all employees
      const empRes = await api.get("/employees");
      const employees =
        empRes.data.records ||
        empRes.data.employees ||
        empRes.data.data ||
        empRes.data ||
        [];

      // Fetch payroll records
      const payRes = await api.get("/payroll");
      const payrolls =
        payRes.data.records ||
        payRes.data.payrolls ||
        payRes.data.data ||
        payRes.data ||
        [];

      // Merge employees with payroll data
      const merged = employees.map((emp) => {
        const payroll = payrolls.find(
          (p) => p.employee?._id === emp._id
        );

        const salary =
          payroll?.baseSalary ??
          emp.salary ??
          emp.baseSalary ??
          0;

        return {
          _id: emp._id,
          employee: emp,
          month: payroll?.month || "Not Generated",
          baseSalary: salary,
          workingDays: payroll?.workingDays ?? 30,
          presentDays: payroll?.presentDays ?? 30,
          paidLeaves: payroll?.paidLeaves ?? 0,
          extraLeaves: payroll?.extraLeaves ?? 0,
          deduction: payroll?.deduction ?? 0,
          finalSalary:
            payroll?.finalSalary ?? salary,
          createdAt:
            payroll?.createdAt || new Date(),
        };
      });

      setSlips(merged);
    } catch (error) {
      console.error("Salary Slip Error:", error);
      setSlips([]);
    } finally {
      setLoading(false);
    }
  };

  loadSalarySlips();
}, []);
  // Download single salary slip as PDF
  const downloadPDF = async (id) => {
    const element = document.getElementById(`slip-${id}`);
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("salary-slip.pdf");
  };

  if (loading) {
    return (
      <div className="slip-page">
        <h2>Salary Slips</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="slip-page">
      <h2>Salary Slips</h2>

      {slips.length === 0 ? (
        <p>No salary slips found.</p>
      ) : (
        slips.map((p) => (
          <div key={p._id} className="slip-wrapper">
            <div id={`slip-${p._id}`} className="salary-slip">
              <h3>{COMPANY.name}</h3>

              <p className="company-address">
                {COMPANY.address} | {COMPANY.email}
              </p>

              <img src="/logo.jpg" width="80" alt="Company Logo" />

              <hr />

              <p>
                <b>Name:</b> {p.employee?.name || "N/A"}
              </p>
              <p>
                <b>Department:</b> {p.employee?.department || "N/A"}
              </p>
              <p>
                <b>Position:</b> {p.employee?.position || "N/A"}
              </p>
              <p>
                <b>Month:</b> {p.month || "N/A"}
              </p>

              <hr />

              <p>Base Salary: ₹ {p.baseSalary ?? 0}</p>
              <p>Working Days: {p.workingDays ?? 0}</p>
              <p>Present Days: {p.presentDays ?? 0}</p>
              <p>Paid Leaves: {p.paidLeaves ?? 0}</p>
              <p>Extra Leaves: {p.extraLeaves ?? 0}</p>

              <hr />

              <p>
                <b>Deduction:</b> ₹ {p.deduction ?? 0}
              </p>

              <h3>Net Pay: ₹ {p.finalSalary ?? 0}</h3>

              <p className="generated">
                Generated on:{" "}
                {p.createdAt
                  ? new Date(p.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="actions">
              <button onClick={() => downloadPDF(p._id)}>
                Download PDF
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}