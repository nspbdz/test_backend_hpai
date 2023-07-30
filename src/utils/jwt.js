const jwt = require("jsonwebtoken");

/**
 *  generate access token
 * @param {string} user
 * @returns {string} access token
 */
exports.generateAccessToken = (user, secretKey) => {
  return jwt.sign(user, secretKey, { expiresIn: "1d" });
};

/**
 *  verify access token
 * @param {string} token access token
 * @returns {strin|object} user
 */
exports.verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};
