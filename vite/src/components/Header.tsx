import Searchbar from "./Searchbar";
import spotifyLogo from "../assets/Spotify_Icon_RGB_White.png";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router";

export default function Header() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <header className="flex items-center justify-between py-4 bg-primary">
      <img src={spotifyLogo} alt="Spotify logo" className="h-12" />
      <Searchbar />
      <button onClick={handleLogout}>
        <FaUserCircle className="w-8 h-8 text-white" />
      </button>
    </header>
  );
}
