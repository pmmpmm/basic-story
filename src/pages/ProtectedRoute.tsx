import { Navigate } from "react-router-dom";
import { UserRole } from "@/domain/UserDomain";

interface PouterProps {
  requireAdmin?: boolean;
  element: React.ReactElement;
}

const ProtectedRoute = ({ requireAdmin, element }: PouterProps) => {
  const userRole = localStorage.getItem(import.meta.env.VITE_ROLE);

  if (!userRole || (requireAdmin && userRole === UserRole.USER)) {
    return <Navigate to="/" replace />;
  }
  return element;
};

export default ProtectedRoute;
