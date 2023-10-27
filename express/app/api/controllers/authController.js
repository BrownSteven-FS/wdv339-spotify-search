const axios = require("axios");
const passport = require("passport");

const spotifyCallback = (req, res, next) => {
  passport.authenticate("spotify", { failureRedirect: "/" }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/");

    req.logIn(user, (err) => {
      if (err) return next(err);

      /* Login successful */
      return res.redirect(
        `/auth/spotify/callback?token=${req.user.accessToken}`
      );
    });
  })(req, res, next);
};

const logout = (req, res) => {
  try {
    req.logout(() => {
      res.redirect("/");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const validateToken = async (req, res) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    if (response.status === 200) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error("Token validation failed:", error);
    res.json({ valid: false });
  }
};

module.exports = { spotifyCallback, logout, validateToken };
