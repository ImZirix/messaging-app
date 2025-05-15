import { useEffect } from "react";
import { useNavigate } from "react-router";

function RedirectIfAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  return children;
}

export default RedirectIfAuth;
