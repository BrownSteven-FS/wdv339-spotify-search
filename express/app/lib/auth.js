const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

const API_URL = process.env.API_URL || "http://localhost:8080/api/v1";

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: `${API_URL}/auth/spotify/callback`,
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      const userData = {
        profile,
        accessToken,
      };
      done(null, userData);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
