import { useEffect, useState } from "react";
import api from "../api/axios";
import EmployeeForm from "./EmployeeForm";
import EditEmployeeModal from "../components/EditEmployeeModal";
import "./Employee.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [editEmp, setEditEmp] = useState(null);

  const role = (localStorage.getItem("role") || "")
    .trim()
    .toLowerCase();

  const loadEmployees = async () => {
    try {
      const res = await api.get(
        `/employees?search=${search}&page=${page}`
      );

      // backend may return array OR paginated object
      if (Array.isArray(res.data)) {
        setEmployees(res.data);
        setPages(1);
      } else {
        setEmployees(res.data.employees || []);
        setPages(res.data.pages || 1);
      }
    } catch (err) {
      console.error("LOAD EMPLOYEES ERROR:", err);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [search, page]);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete employee?")) return;

    await api.delete(`/employees/${id}`);
    loadEmployees();
  };

  return (
    <div className="ems-container">
      {/* HEADER */}
      <div className="ems-header">
        <h2>Employee Management</h2>

        <input
          className="search-input"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* ADD EMPLOYEE (ADMIN ONLY) */}
      {role === "admin" && (
        <EmployeeForm refresh={loadEmployees} />
      )}

      {/* TABLE */}
      <table className="ems-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            {(role === "admin" || role === "manager") && (
              <th>Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>₹ {emp.salary}</td>

                {(role === "admin" ||
                  role === "manager") && (
                  <td>
                    <button
                      onClick={() => setEditEmp(emp)}
                      style={{ marginRight: "8px" }}
                    >
                      ✏️
                    </button>

                    {role === "admin" && (
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteEmployee(emp._id)
                        }
                      >
                        ❌
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* EDIT MODAL */}
      {editEmp && (
        <EditEmployeeModal
          emp={editEmp}
          close={() => setEditEmp(null)}
          refresh={loadEmployees}
        />
      )}
    </div>
  );
}
