import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export default function OAuthCallbackPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      login(token);
      console.log("Login Successful! Token:", token);

      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Processing...</p>;
}
