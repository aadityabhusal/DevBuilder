const JWT = require("jsonwebtoken");
const createError = require("http-errors");

function signAccessToken(_id, firstName, lastName, status) {
  return new Promise((resolve, reject) => {
    const payload = { _id, firstName, lastName, status };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "15m",
      issuer: "devbuilder",
      audience: _id,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) return reject(createError.InternalServerError());
      resolve(token);
    });
  });
}
function signRefreshToken(_id) {
  return new Promise((resolve, reject) => {
    const payload = { _id };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "1y",
      issuer: "devbuilder",
      audience: _id,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(createError.InternalServerError());
      resolve(token);
    });
  });
}

function verifyAccessToken(req, res, next) {
  if (!req.headers["authorization"]) return next(createError.Unauthorized());
  const token = req.headers["authorization"].split(" ")[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createError.Unauthorized(message));
    }
    if (payload.status === 0) {
      return next(createError.Forbidden("You need to verify your email."));
    }
    req.payload = payload;
    next();
  });
}

function verifyRefreshToken(token, rfToken) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
      if (!err || err.message === "jwt expired") return resolve(token);
      return reject(createError.Unauthorized());
    });
  }).then((accessToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(rfToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) return reject(createError.Unauthorized());
        let { _id, firstName, lastName, status } = JWT.decode(accessToken);
        resolve({ _id, firstName, lastName, status });
      });
    });
  });
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
