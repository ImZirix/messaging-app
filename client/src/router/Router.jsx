import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import Login from "../pages/Login.jsx";
import HomePage from "../pages/HomePage.jsx";
import AuthWrapper from "../components/AuthWrapper.jsx";
import Register from "../pages/Register.jsx";
import Logout from "../pages/Logout.jsx";
import RedirectIfAuth from "../components/RedirectIfAuth.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthWrapper>
            <HomePage />
          </AuthWrapper>
        ),
      },
    ],
  },
  {
    path: "login",
    element: (
      <RedirectIfAuth>
        <Login />
      </RedirectIfAuth>
    ),
  },
  {
    path: "register",
    element: (
      <RedirectIfAuth>
        <Register />
      </RedirectIfAuth>
    ),
  },
  {
    path: "logout",
    element: (
      <AuthWrapper>
        <Logout />
      </AuthWrapper>
    ),
  },
]);

export default router;
