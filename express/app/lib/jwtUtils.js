const jwt = require("jsonwebtoken");

const generateJWT = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: expiresIn,
  });
};

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

const extractTokenId = (req) => {
  const token = req.headers.authorization;
  if (!token) {
    const err = new Error("Authorization token missing");
    err.status = 401;
    throw err;
  }
  const { tokenId } = verifyJWT(token);
  return tokenId;
};

module.exports = { generateJWT, verifyJWT, extractTokenId };
