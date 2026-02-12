import { useEffect, useState } from "react";
import api from "../api/axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./SalarySlip.css";
import { COMPANY } from "./config/company";

export default function SalarySlip() {
  const [slips, setSlips] = useState([]);

  useEffect(() => {
    api.get("/payroll").then((res) => {
      setSlips(res.data.payrolls || []);
    });
  }, []);

  // ✅ per-slip PDF
  const downloadPDF = async (id) => {
    const element = document.getElementById(`slip-${id}`);

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

  return (
    <div className="slip-page">
      <h2>Salary Slips</h2>

      {slips.map((p) => (
        <div key={p._id} className="slip-wrapper">
          {/* ✅ UNIQUE ID PER SLIP */}
          <div id={`slip-${p._id}`} className="salary-slip">
            <h3>{COMPANY.name}</h3>
            <p className="company-address">
              {COMPANY.address} | {COMPANY.email}
            </p>
           <img src="/logo.jpg" width="80" alt="Company Logo" />

            <hr />

            <p><b>Name:</b> {p.employee?.name}</p>
            <p><b>Department:</b> {p.employee?.department}</p>
            <p><b>Position:</b> {p.employee?.position}</p>
            <p><b>Month:</b> {p.month}</p>

            <hr />

            <p>Base Salary: ₹ {p.baseSalary}</p>
            <p>Working Days: {p.workingDays}</p>
            <p>Present Days: {p.presentDays}</p>
            <p>Paid Leaves: {p.paidLeaves}</p>
            <p>Extra Leaves: {p.extraLeaves}</p>

            <hr />

            <p><b>Deduction:</b> ₹ {p.deduction}</p>
            <h3>Net Pay: ₹ {p.finalSalary}</h3>

            <p className="generated">
              Generated on: {new Date(p.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="actions">
            <button onClick={() => downloadPDF(p._id)}>
              Download PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
