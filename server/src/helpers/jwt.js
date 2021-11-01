const JWT = require("jsonwebtoken");

function signAccessToken(_id) {
  return new Promise((resolve, reject) => {
    const payload = { _id };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "1h",
      issuer: "devbuilder",
      audience: _id,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) return reject(new Error("Internal Server Error"));
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
      if (err) return reject(new Error("Internal Server Error"));
      resolve(token);
    });
  });
}

function verifyAccessToken(req, res, next) {
  try {
    if (!req.headers["authorization"]) throw new Error("");
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError") throw new Error("");
        else throw new Error(err.message);
      }
      req.payload = payload;
      next();
    });
  } catch (err) {
    if (err.message === "") err.message = "Unauthorized Access Error";
    err.status = 401;
    next(err);
  }
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        let error = new Error("Unauthorized Access Error");
        error.status = 401;
        return reject(error);
      }
      resolve(payload._id);
    });
  });
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
