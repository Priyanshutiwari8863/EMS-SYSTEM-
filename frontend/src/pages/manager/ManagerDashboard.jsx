import DashboardCards from "../../components/DashboardCards";
import EmployeeList from "../EmployeeList";

export default function ManagerDashboard() {
  return (
    <>
      <h1>Manager Dashboard</h1>
      <DashboardCards total="View Only" />
      <EmployeeList />
    </>
  );
}
