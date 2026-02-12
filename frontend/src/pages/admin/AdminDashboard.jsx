import DashboardCards from "../../components/DashboardCards";
import EmployeeList from "../EmployeeList";
import api from "../../api/axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get("/employees").then(res => {
      setTotal(res.data.employees?.length || 0);
    });
  }, []);

  return (
    <>
      <h1>Admin Dashboard</h1>
      <DashboardCards total={total} />
      <EmployeeList />
    </>
  );
}
