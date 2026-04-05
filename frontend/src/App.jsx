import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DonorDash from "./pages/DonorDash";
import ReceiverDash from "./pages/ReceiverDash";
import VolunteerDash from "./pages/VolunteerDash";
import NGODash from "./pages/NGODash";
import Logout from "./pages/Logout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Unauthorized from "./pages/UnAuthorized";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/donor-dashboard"
          element={
            <ProtectedRoute requiredRole="donor">
              <DonorDash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receiver-dashboard"
          element={
            <ProtectedRoute requiredRole="receiver">
              <ReceiverDash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer-dashboard"
          element={
            <ProtectedRoute requiredRole="volunteer">
              <VolunteerDash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ngo-dashboard"
          element={
            <ProtectedRoute requiredRole="ngo">
              <NGODash />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;
