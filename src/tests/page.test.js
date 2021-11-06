const request = require("supertest");
const mongoose = require("mongoose");

beforeAll(async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect("mongodb://localhost/WebsiteBuilder_Test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

const app = require("../app");

const Page = require("../models/pageModel");

describe("POST - /page", () => {
  beforeAll(async () => {
    await Page.deleteMany({ status: 0 });
  });
  describe("All required fields is given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/page").send({
        name: "Test Page",
        siteId: "60af84a03fb365195882a333",
      });
      expect(response.statusCode).toBe(200);
    });
    test("Should respond with an error", async () => {
      const response = await request(app).post("/page").send({
        name: "Test Site",
        siteId: "60af84a03fb365195882a333",
      });
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe("Any required field is missing", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).post("/page").send({
        name: "Test Site",
        siteId: "",
      });
      expect(response.statusCode).toBe(500);
    });
    test("Should respond with an error", async () => {
      const response = await request(app).post("/page").send({
        name: "Test Site",
        siteId: "",
      });
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("GET - /page/:pageId", () => {
  describe("Valid Item Id Provided", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).get("/page/60af84a03fb365195882a334");
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with an page", async () => {
      const response = await request(app).get("/page/60af84a03fb365195882a334");
      expect(response.body._id).toBeDefined();
    });
  });

  describe("Invalid Valid User Id Provided", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).get("/page/123");
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with an error", async () => {
      const response = await request(app).get("/page/123");
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("PUT - /page/:pageId", () => {
  describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .put("/page/60af84a03fb365195882a334")
        .send({
          _id: "60af84a03fb365195882a334",
          name: `index#${Math.floor(Math.random() * 10000)}.html`,
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .put("/page/60af84a03fb365195882a334")
        .send({
          _id: "60af84a03fb365195882a334",
          name: `index#${Math.floor(Math.random() * 10000)}.html`,
        });
      expect(response.body.message).toBeDefined();
    });
  });

  describe("Any required values missing", () => {
    test("Should respond with a status code of 400", async () => {
      const response = await request(app)
        .put("/page/60af84a03fb365195882a334")
        .send({
          _id: "60af84a03fb365195882a334",
          name: "",
        });
      expect(response.statusCode).toBe(400);
    });

    test("Should respond with error", async () => {
      const response = await request(app)
        .put("/page/60af84a03fb365195882a334")
        .send({
          _id: "60af84a03fb365195882a334",
          name: "",
        });
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("DELETE - /page/:pageId", () => {
  describe("Wrong Values Provided", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).delete("/page/123").send({
        _id: "123",
      });
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with error", async () => {
      const response = await request(app).delete("/page/123").send({
        _id: "123",
      });
      expect(response.body.error).toBeDefined();
    });
  });

  describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .delete("/page/60afa8391388452030ab713e")
        .send({
          _id: "60afa8391388452030ab713e",
        });
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET - /page/:pageId/export", () => {
  describe("Valid Item Id Provided", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).get(
        "/page/60af84a03fb365195882a334/export"
      );
      expect(response.statusCode).toBe(200);
    });

    /*     test("Should respond with an page", async () => {
      const response = await request(app).get(
        "/page/60af84a03fb365195882a334/export"
      );
      expect(response.body._id).toBeDefined();
    }); */
  });

  describe("Invalid Valid User Id Provided", () => {
    test("Should respond with a status code of 400", async () => {
      const response = await request(app).get("/page/123/export");
      expect(response.statusCode).toBe(400);
    });

    test("Should respond with an error", async () => {
      const response = await request(app).get("/page/123/export");
      expect(response.body.error).toBeDefined();
    });
  });
});
