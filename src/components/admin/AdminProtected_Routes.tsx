import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ user, children }:any) => {
    if (!user) {
      return <Navigate to="/admin" replace />;
    }
  
    return children;
  };

  export default AdminProtectedRoute