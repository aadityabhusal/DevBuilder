const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");

const app = express();
const routes = require("./routes");

app.use(helmet());
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", routes());

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use(async (err, req, res, next) => {
  console.log(err);
  if (err.name === "MongooseError" || err.name === "MongoError")
    err = createError.InternalServerError();
  res.status(err.status || 500);
  res.send({ status: err.status || 500, message: err.message });
});

module.exports = app;
