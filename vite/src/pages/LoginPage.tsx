import { useContext, useEffect } from "react";
import Login from "../components/Login";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router";

function LoginPage() {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  return <>{!isLoading && <Login />}</>;
}

export default LoginPage;
