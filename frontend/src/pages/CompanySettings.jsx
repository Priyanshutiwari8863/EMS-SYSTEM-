import { useEffect, useState } from "react";
import api from "../api/axios";
import "./CompanySettings.css";

export default function CompanySettings() {
  const [darkMode, setDarkMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    leavePerMonth: 3,
    logo: "",
  });

  const [file, setFile] = useState(null);

  /* ================= LOAD SETTINGS ================= */
  useEffect(() => {
    api.get("/company").then((res) => {
      if (res.data) setForm(res.data);
    });
  }, []);

  /* ================= SAVE SETTINGS ================= */
  const saveSettings = async () => {
    await api.put("/company", form);
    alert("Company settings saved ✅");
  };

  /* ================= UPLOAD LOGO ================= */
  const uploadLogo = async () => {
    if (!file) return alert("Select logo first");

    const data = new FormData();
    data.append("logo", file);

    const res = await api.put("/company/logo", data);
    setForm(res.data);

    alert("Logo uploaded ✅");
  };

  /* ================= DRAG DROP ================= */
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  /* ================= PDF GENERATOR ================= */
  const downloadPDF = () => {
    const content = `Company Profile\n\nName: ${form.name}\nAddress: ${form.address}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nBank: ${form.bankName}\nAccount: ${form.accountNumber}\nIFSC: ${form.ifsc}\n\nLeaves per month: ${form.leavePerMonth}`;

    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "company-profile.pdf";
    a.click();
  };

  return (
    <div className={`company-page ${darkMode ? "dark" : ""}`}>
      <div className="top-bar">
        <h2>Company Settings</h2>

        <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* ================= LOGO ================= */}
      <div
        className="logo-section"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <img
          src={
            form.logo
              ? `http://localhost:5000${form.logo}`
              : "https://via.placeholder.com/120"
          }
          alt="logo"
        />

        <p>Drag & drop logo here or select file</p>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadLogo}>Upload Logo</button>
      </div>

      {/* ================= FORM ================= */}
      <div className="company-form">
        <input
          placeholder="Company Name"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Address"
          value={form.address || ""}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          value={form.phone || ""}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <hr />
        <h3>Bank Details</h3>

        <input
          placeholder="Bank Name"
          value={form.bankName || ""}
          onChange={(e) => setForm({ ...form, bankName: e.target.value })}
        />

        <input
          placeholder="Account Number"
          value={form.accountNumber || ""}
          onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
        />

        <input
          placeholder="IFSC Code"
          value={form.ifsc || ""}
          onChange={(e) => setForm({ ...form, ifsc: e.target.value })}
        />

        <hr />
        <h3>Leave Policy</h3>

        <input
          type="number"
          placeholder="Leaves per month"
          value={form.leavePerMonth || 0}
          onChange={(e) => setForm({ ...form, leavePerMonth: e.target.value })}
        />

        <button className="save-btn" onClick={saveSettings}>
          Save Settings
        </button>

        <button className="pdf-btn" onClick={downloadPDF}>
          Download Company PDF
        </button>
      </div>
    </div>
  );
}