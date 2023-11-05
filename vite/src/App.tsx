import { ReactNode, useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import {
  DashboardPage,
  LoginPage,
  NotFoundPage,
  OAuthCallbackPage,
} from "./pages";
import { AuthContext } from "./providers/AuthProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingComponent from "./components/Loading";

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectPath = "/login",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex justify-center flex-grow py-4 md:py-8">
        {!isLoading ? (
          <Routes>
            <Route
              element={<ProtectedRoute isAllowed={isLoggedIn || isLoading} />}
            >
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            <Route path="/spotify/callback" element={<OAuthCallbackPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        ) : (
          <LoadingComponent />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
