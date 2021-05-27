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

const Site = require("../models/siteModel");

describe("POST - /site", () => {
  beforeAll(async () => {
    await Site.deleteMany({ status: 0 });
  });
  describe("All required fields is given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/site").send({
        name: "Test Site",
        userId: "60af81b0b3315e237cfef8a4",
      });
      expect(response.statusCode).toBe(200);
    });
    test("Should respond with an error", async () => {
      const response = await request(app).post("/site").send({
        name: "Test Site",
        userId: "60af81b0b3315e237cfef8a4",
      });
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe("Any required field is missing", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).post("/site").send({
        name: "Test Site",
        userId: "",
      });
      expect(response.statusCode).toBe(500);
    });
    test("Should respond with an error", async () => {
      const response = await request(app).post("/site").send({
        name: "Test Site",
        userId: "",
      });
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("GET - /site/:siteId", () => {
  describe("Valid Item Id Provided", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).get("/site/60af84a03fb365195882a333");
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with an site", async () => {
      const response = await request(app).get("/site/60af84a03fb365195882a333");
      expect(response.body._id).toBeDefined();
    });
  });

  describe("Invalid Valid User Id Provided", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).get("/site/123");
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with an error", async () => {
      const response = await request(app).get("/site/123");
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("PUT - /site/:siteId", () => {
  describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .put("/site/60af84a03fb365195882a333")
        .send({
          _id: "60af84a03fb365195882a333",
          name: `Site#${Math.floor(Math.random() * 10000)}`,
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .put("/site/60af84a03fb365195882a333")
        .send({
          _id: "60af84a03fb365195882a333",
          name: `Site#${Math.floor(Math.random() * 10000)}`,
        });
      expect(response.body.message).toBeDefined();
    });
  });

  describe("Any required values missing", () => {
    test("Should respond with a status code of 400", async () => {
      const response = await request(app)
        .put("/site/60af84a03fb365195882a333")
        .send({
          _id: "60af84a03fb365195882a333",
          name: "",
        });
      expect(response.statusCode).toBe(400);
    });

    test("Should respond with error", async () => {
      const response = await request(app)
        .put("/site/60af84a03fb365195882a333")
        .send({
          _id: "60af84a03fb365195882a333",
          name: "",
        });
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("DELETE - /site/:siteId", () => {
  describe("Wrong Values Provided", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).delete("/site/123").send({
        _id: "123",
      });
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with error", async () => {
      const response = await request(app).delete("/site/123").send({
        _id: "123",
      });
      expect(response.body.error).toBeDefined();
    });
  });

  describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .delete("/site/60af84a03fb365195882a335")
        .send({
          _id: "60af84a03fb365195882a335",
        });
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET - /site/:siteId/export", () => {
  describe("Valid Item Id Provided", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).get(
        "/site/60af84a03fb365195882a333/export"
      );
      expect(response.statusCode).toBe(200);
    });

    /*     test("Should respond with an site", async () => {
      const response = await request(app).get(
        "/site/60af84a03fb365195882a333/export"
      );
      expect(response.body._id).toBeDefined();
    }); */
  });

  describe("Invalid Valid User Id Provided", () => {
    test("Should respond with a status code of 400", async () => {
      const response = await request(app).get("/site/123/export");
      expect(response.statusCode).toBe(400);
    });

    test("Should respond with an error", async () => {
      const response = await request(app).get("/site/123/export");
      expect(response.body.error).toBeDefined();
    });
  });
});
