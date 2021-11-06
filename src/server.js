const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const PORT = process.env.PORT || 8000;

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err.message));

mongoose.connection.on("connected", () => {
  console.log("Mongoose Connected to the Database");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Connection Disonnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
