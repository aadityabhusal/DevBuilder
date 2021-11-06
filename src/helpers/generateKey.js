const crypto = require("crypto");

const generateKey = () => {
  let key = crypto.randomBytes(64).toString("hex");
  console.log("Key Generated: ", key);
  return key;
};

module.exports = {
  generateKey,
};
