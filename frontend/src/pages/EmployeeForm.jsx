import { useState } from "react";
import api from "../api/axios";

export default function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    department: "",
    position: "",
    salary: ""
  });

  const submit = async () => {
    console.log("FORM DATA 👉", form);

    await api.post("/employees", {
      name: form.name,
      department: form.department,
      position: form.position,
      salary: Number(form.salary)
    });

    refresh();

    setForm({
      name: "",
      department: "",
      position: "",
      salary: ""
    });
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Department"
        value={form.department}
        onChange={(e) =>
          setForm({ ...form, department: e.target.value })
        }
      />

      <input
        placeholder="Position"
        value={form.position}
        onChange={(e) =>
          setForm({ ...form, position: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Salary"
        value={form.salary}
        onChange={(e) =>
          setForm({ ...form, salary: e.target.value })
        }
      />

      <button type="button" onClick={submit}>
        Add Employee
      </button>
    </div>
  );
}
