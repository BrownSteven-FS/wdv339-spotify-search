import { useState, createContext, ReactNode, useEffect } from "react";
import { API_BASE } from "../lib/helpers";

interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<any | null>>;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  initiateSpotifyLogin: () => void;
}

const defaultAuthContext: AuthContextType = {
  token: null,
  isLoggedIn: false,
  isLoading: false,
  setToken: () => {},
  login: () => {},
  logout: () => {},
  initiateSpotifyLogin: () => {},
};

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext(defaultAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const SPOTIFY_URL = `${API_BASE}/spotify`;

  let ignore = false;
  useEffect(() => {
    const revalidateToken = async () => {
      try {
        const storedTokenJSON = localStorage.getItem("token");
        if (!storedTokenJSON) return;
        const storedToken = JSON.parse(storedTokenJSON);
        /* If the token is not valid JSON, it will be caught here */

        const response = await fetch(`${SPOTIFY_URL}/validate`, {
          method: "GET",
          headers: { Authorization: storedToken },
        });
        const data = await response.json();

        if (data.exists) {
          setToken(storedToken);
          setIsLoggedIn(true);
        } else {
          throw new Error("Token not valid!");
        }
      } catch (e) {
        console.error(e);
        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };
    if (!isLoggedIn && !ignore) revalidateToken();
    else setIsLoading(false);

    return () => {
      ignore = true;
    };
  }, []);

  const login = (token: string) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("token", JSON.stringify(token));
  };

  const initiateSpotifyLogin = () => {
    window.location.href = SPOTIFY_URL;
  };

  const logout = async () => {
    try {
      if (token)
        await fetch(`${SPOTIFY_URL}/logout`, {
          method: "GET",
          headers: { Authorization: token },
        });
      setToken(null);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        login,
        logout,
        isLoggedIn,
        isLoading,
        initiateSpotifyLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
