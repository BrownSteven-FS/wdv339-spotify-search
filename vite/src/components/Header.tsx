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
    <header className="bg-primary p-4 flex justify-between items-center">
      <img src={spotifyLogo} alt="Spotify logo" className="h-12" />
      <Searchbar />
      <button onClick={handleLogout}>
        <FaUserCircle className="text-white h-8 w-8" />
      </button>
    </header>
  );
}
