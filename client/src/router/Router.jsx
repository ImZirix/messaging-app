import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import Login from "../pages/Login.jsx";
import HomePage from "../pages/HomePage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
