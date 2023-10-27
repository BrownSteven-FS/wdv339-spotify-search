const { json, urlencoded } = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

module.exports = async (app) => {
  /* Middleware for Spotify OAuth */
  app.use(
    session({
      secret: process.env.SPOTIFY_SECRET_KEY,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    urlencoded({
      extended: true,
    })
  );
  app.use(json());
  app.use(cors());
};
