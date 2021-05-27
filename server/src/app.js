const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const routes = require("./routes");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes());

app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err.message });
});

module.exports = app;
