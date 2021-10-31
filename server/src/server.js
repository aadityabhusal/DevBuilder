const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const PORT = process.env.PORT || 8000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/WebsiteBuilder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
