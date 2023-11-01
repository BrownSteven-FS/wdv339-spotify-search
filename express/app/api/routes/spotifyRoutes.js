const express = require("express");
const {
  spotifyAuth,
  spotifyCallback,
  logout,
  validateToken,
  searchSpotify,
} = require("../controllers/spotifyController");

const jwtMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/", spotifyAuth);
router.get("/callback", spotifyCallback);
router.get("/logout", jwtMiddleware, logout);
router.get("/validate", jwtMiddleware, validateToken);
router.get("/search", jwtMiddleware, searchSpotify);

module.exports = router;

module.exports = router;
