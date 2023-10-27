import Searchbar from "./Searchbar";
import spotifyLogo from "../assets/Spotify_Icon_RGB_White.png";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-primary p-4 flex justify-between items-center">
      <img src={spotifyLogo} alt="Spotify logo" className="h-12" />
      <Searchbar />
      <FaUserCircle className="text-white h-8 w-8" />
    </header>
  );
}
