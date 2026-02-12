import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import PayrollHistory from "./pages/PayrollHistory";
import AdminAttendance from "./pages/AdminAttendance";
import SalarySlip from "./pages/SalarySlip";
import AdminAnalytics from "./pages/AdminAnalytics";

import LeaveApply from "./pages/LeaveApply";
import AdminLeaves from "./pages/AdminLeaves";
import CompanySettings from "./pages/CompanySettings";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import GoogleSuccess from "./pages/GoogleSuccess";
import ProjectAnalytics from "./pages/ProjectAnalytics";

import ProjectTasks from "./pages/ProjectTasks";

import ProjectTimeline from "./pages/ProjectTimeline";



export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/" />}
      />

      {/* ================= PROTECTED ================= */}
      <Route
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />


      <Route
          path="/timeline"
          element={token ? <ProjectTimeline /> : <Navigate to="/login" />}
       />


      <Route
        path="/attendance"
        element={token ? <Attendance /> : <Navigate to="/login" />}
      />

      <Route
        path="/payroll"
        element={token ? <Payroll /> : <Navigate to="/login" />}
      />

      <Route
        path="/payroll-history"
        element={token ? <PayrollHistory /> : <Navigate to="/login" />}
      />

      <Route
        path="/salary-slip"
        element={token ? <SalarySlip /> : <Navigate to="/login" />}
      />
       <Route
          path="/company"
          element={token ? <CompanySettings /> : <Navigate to="/login" />}
       />
       
       <Route
        path="/project/:id/tasks"
        element={token ? <ProjectTasks /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin-attendance"
        element={token ? <AdminAttendance /> : <Navigate to="/login" />}
      />

      <Route
        path="/analytics"
        element={token ? <AdminAnalytics /> : <Navigate to="/login" />}
      />

        <Route
        path="/leaves"
        element={token ? <LeaveApply /> : <Navigate to="/login" />}
        />
       
       <Route
          path="/project-analytics"
          element={token ? <ProjectAnalytics /> : <Navigate to="/login" />}
       />


      <Route
      path="/admin-leaves"
      element={token ? <AdminLeaves /> : <Navigate to="/login" />}
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/google-success" element={<GoogleSuccess />} />

    </Routes>
  );
}
