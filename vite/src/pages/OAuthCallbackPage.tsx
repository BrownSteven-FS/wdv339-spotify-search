import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export default function OAuthCallbackPage() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    if (token) {
      setToken(token);
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [location, navigate, setToken]);

  return <p>Processing...</p>;
}
