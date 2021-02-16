const express = require("express");
const fs = require("fs");
const app = express();
const port = 8000;

app.get("/", (request, response) => {
  response.send("Hello world");
});

app.get("/page/:pageId", (request, response) => {
  let pageId = request.params.pageId;
  try {
    const data = fs.readFileSync(`pages/${pageId}.json`, "utf8");
    const responseData = JSON.parse(data);
    response.send(responseData);
  } catch (error) {
    response.send({ error: "Page doesn't exist", pageId });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
