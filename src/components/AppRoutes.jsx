import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Browse from "./Browse";
import Movie from "./Movie";
import Login from "./Login";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import Error from "./Error";
import Favorites from "./Favorites";

const AppRoutes = () => {
  const user = useSelector((store) => store.user.value);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: user ? (
        <Navigate to="/browse" replace />
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    {
      path: "/browse",
      element: (
        <ProtectedRoute user={user}>
          <Browse />
        </ProtectedRoute>
      ),
    },
    {
      path: "/movie/:id",
      element: (
        <ProtectedRoute user={user}>
          <Movie />
        </ProtectedRoute>
      ),
    },
    {
      path: "/favorites",
      element: (
        <ProtectedRoute user={user}>
          <Favorites />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: user ? <Navigate to="/browse" replace /> : <Login />,
    },
    {
      path: "/error",
      element: <Error />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default AppRoutes;
