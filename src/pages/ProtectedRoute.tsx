import { Navigate } from "react-router-dom";
interface PouterProps {
  requireAdmin?: boolean;
  element: React.ReactElement;
}

const ProtectedRoute = ({ requireAdmin, element }: PouterProps) => {
  const userRole = localStorage.getItem(import.meta.env.VITE_ROLE);

  if (!userRole || (requireAdmin && userRole === "user")) {
    return <Navigate to="/" replace />;
  }
  return element;
};

export default ProtectedRoute;
