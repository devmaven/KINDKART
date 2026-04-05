// hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// Helper function to parse user data safely
const getUserData = () => {
  try {
    const user = localStorage.getItem("user");
    console.log("ssks", user);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const ProtectedRoute = ({
  children,
  requiredRole,
  allowedRoles = [],
}) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");


  

  // Check if user is authenticated
  if (!user && !token) return <Navigate to="/login" />;

  // Role-based access control
  if (requiredRole) {
    // Single role check
    if (role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Multiple roles check (array of allowed roles)
  if (allowedRoles && allowedRoles.length > 0) {
    if (role || !allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Optional: Check for specific permissions (if you have a permissions system)
  if (children.props?.requiredPermissions) {
    const hasPermission = checkUserPermissions(
      role,
      children.props.requiredPermissions
    );
    if (!hasPermission) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

// Optional: Permission checker helper
const checkUserPermissions = (user, requiredPermissions) => {
  if (!user || !user.permissions) return false;

  // Admin has all permissions
  if (user.role === "admin") return true;

  // Check if user has all required permissions
  return requiredPermissions.every((permission) =>
    user.permissions.includes(permission)
  );
};
