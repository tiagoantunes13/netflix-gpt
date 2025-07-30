import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user }) => {
  if (user) {
    return children;
  } else {
    return (
      <Navigate
        to={"/login"}
        replace
        state={{ message: "Please log in to access this page" }}
      />
    );
  }
};

export default ProtectedRoute;
