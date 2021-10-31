const crypto = require("crypto");
let key1 = crypto.randomBytes(64).toString("hex");
let key2 = crypto.randomBytes(64).toString("hex");
console.table([key1, key2]);
