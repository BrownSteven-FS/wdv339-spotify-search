const Token = require("../api/models/tokenModel");
const { extractTokenId } = require("../lib/jwtUtils");
const { requestSpotifyToken } = require("../lib/spotifyUtils");

const jwtMiddleware = async (req, res, next) => {
  try {
    const tokenId = extractTokenId(req);
    const token = await Token.findOne({ _id: tokenId });
    if (!token) return next({ message: "Token not found", status: 404 });

    const now = new Date().getTime();
    /* We need to refresh the token */
    if (now > token.expiresIn) {
      // console.log("Renewing refresh token", spotifyToken.expiresIn);
      const newExpiresIn = await requestSpotifyToken(
        tokenId,
        null,
        "refresh_token",
        token.refreshToken
      );
      // console.log("Renewed to", newExpiresIn);
      await Token.updateOne(
        { _id: tokenId },
        { $set: { expiresIn: newExpiresIn } }
      );
    }
    req.token = token;
    return next();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = jwtMiddleware;
