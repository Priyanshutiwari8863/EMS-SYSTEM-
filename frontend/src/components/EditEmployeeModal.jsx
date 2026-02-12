import { useState } from "react";
import api from "../api/axios";

export default function AddEmployeeModal({ close, refresh }) {
  const [form, setForm] = useState({
    name: "",
    department: "",
    position: "",
    salary: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async () => {
    await api.post("/employees", {
      ...form,
      salary: Number(form.salary)
    });

    refresh();
    close();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Add Employee</h3>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />

        <input
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
        />

        <input
          name="salary"
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <button onClick={submit}>Add</button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
}
