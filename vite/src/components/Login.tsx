import spotifyLogo from "../assets/Spotify_Icon_RGB_Green.png";

export default function Login() {
  return (
    <section className="flex items-center flex-col justify-center self-center">
      <img src={spotifyLogo} alt="Spotify logo" className="w-24 h-24" />
      <h2>Please sign in</h2>
      <p className="max-w-md text-center">
        In order to search for artists, tracks, or songs, you must login to your
        Spotify Account
      </p>
      <button>Sign in</button>
    </section>
  );
}
