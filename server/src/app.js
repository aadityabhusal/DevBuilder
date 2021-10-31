const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

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
app.use("/", routes());

app.use(async (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ status: err.status || 500, message: err.message });
});

module.exports = app;
