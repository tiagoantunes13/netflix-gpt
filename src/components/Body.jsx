import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import AuthWrapper from "./AuthWrapper";
import Error from "./Error";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthWrapper>
          <Login />
        </AuthWrapper>
      ),
    },
    {
      path: "/browse",
      element: (
        <AuthWrapper>
          <Browse />
        </AuthWrapper>
      ),
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

export default Body;
