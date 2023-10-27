const express = require("express");
const passport = require("passport");
const {
  spotifyCallback,
  logout,
  validateToken,
} = require("../controllers/authController");
const router = express.Router();

router.get("/spotify", passport.authenticate("spotify"));
router.get("/spotify/callback", spotifyCallback);
router.get("/logout", logout);
router.get("/validateToken", validateToken);
module.exports = router;
