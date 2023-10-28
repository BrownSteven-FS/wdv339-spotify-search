const axios = require("axios");
const Token = require("../api/models/tokenModel");
const API_URL = process.env.API_URL || "http://localhost:8080/api/v1";

const requestSpotifyToken = async (tokenId, code, grantType, refreshToken) => {
  const params = new URLSearchParams({
    grant_type: grantType,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  if (grantType === "authorization_code") {
    params.append("code", code);
    params.append("redirect_uri", `${API_URL}/spotify/callback`);
  } else {
    params.append("refresh_token", refreshToken);
  }

  try {
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    data.expires_in = new Date().getTime() + data.expires_in * 1000; // Prod refresh
    // data.expires_in = new Date().getTime() + 5 * 1000; // Used for testing refresh
    await updateUserTokens(tokenId, data);
    return data.expires_in;
  } catch (error) {
    console.error(error);
    return null; // Will be caught in controller
  }
};

const updateUserTokens = async (tokenId, data) => {
  return await Token.updateOne(
    { _id: tokenId },
    {
      $set: {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
      },
    },
    { upsert: true }
  );
};

module.exports = { requestSpotifyToken, updateUserTokens };
