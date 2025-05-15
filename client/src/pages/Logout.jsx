import { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }, [navigate]);
  return null;
}

export default Logout;
