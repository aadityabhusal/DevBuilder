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
      if (err) {
        console.log(err);
        let error = new Error("Internal Server Error");
        error.status = 500;
        return reject(error);
      }
      resolve(token);
    });
  });
}

module.exports = {
  signAccessToken,
};
