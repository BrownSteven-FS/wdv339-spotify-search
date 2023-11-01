const axios = require("axios");
const crypto = require("crypto");
const { Types } = require("mongoose");
const Token = require("../models/tokenModel");
const { generateJWT, extractTokenId } = require("../../lib/jwtUtils");
const { requestSpotifyToken } = require("../../lib/spotifyUtils");

const API_URL = process.env.API_URL || "http://localhost:8080/api/v1";

const spotifyCallback = async (req, res, next) => {
  const { code } = req.query;
  if (!code) return res.redirect("/login");

  try {
    const tokenId = new Types.ObjectId();
    const expiresIn = await requestSpotifyToken(
      tokenId,
      code,
      "authorization_code"
    );

    if (!expiresIn) return res.redirect("/login");

    const token = generateJWT({ tokenId: tokenId.toString() }, expiresIn);
    res.redirect(`/spotify/callback?token=${token}`);
  } catch (err) {
    return next(err);
  }
};

const spotifyAuth = (req, res) => {
  // We'll generate the state to prevent CSRF
  const state = crypto.randomBytes(16).toString("hex");

  const queryParams = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: `${API_URL}/spotify/callback`,
    state: state,
    scope: "user-read-email",
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
};

const logout = async (req, res, next) => {
  try {
    const tokenId = extractTokenId(req);
    await Token.deleteOne({ tokenId });

    res.status(200).json({ message: "Log out successful!" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const validateToken = async (req, res, next) => {
  try {
    const tokenId = extractTokenId(req);
    const token = await Token.findOne({ _id: tokenId });

    if (token) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const searchSpotify = async (req, res, next) => {
  const { term } = req.query;
  if (!term) return next({ message: "Search term missing", status: 400 });

  try {
    const { accessToken } = req.token;
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        q: term,
        type: "artist,track,album",
        limit: 5,
      },
    });
    const response = {
      artists: data.artists ? data.artists.items : [],
      songs: data.tracks ? data.tracks.items : [],
      albums: data.albums ? data.albums.items : [],
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchSpotify,
  spotifyCallback,
  spotifyAuth,
  logout,
  validateToken,
};
