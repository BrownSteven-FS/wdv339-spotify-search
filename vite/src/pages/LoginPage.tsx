import spotifyLogo from "../assets/Spotify_Icon_CMYK_Green.png";

function LoginPage() {
  return (
    <>
      <div>
        <h1>Test</h1>
        <p className="text-xl font-bold">Spotify App</p>
        <img src={spotifyLogo} className="logo react" alt="React logo" />
      </div>
    </>
  );
}

export default LoginPage;
