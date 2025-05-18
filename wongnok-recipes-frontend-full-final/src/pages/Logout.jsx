import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedInUser");
    alert("ออกจากระบบเรียบร้อยแล้ว");
    navigate("/");
  }, [navigate]);

  return null;
};

export default Logout;