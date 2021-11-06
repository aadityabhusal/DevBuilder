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

const User = require("../models/userModel");

describe("POST - /user/login", () => {
  describe("Email and Password given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/user/login").send({
        email: "testuser@gmail.com",
        password: "testuser123",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with an user token", async () => {
      const response = await request(app).post("/user/login").send({
        email: "testuser@gmail.com",
        password: "testuser123",
      });
      expect(response.body.token).toBeDefined();
    });
  });

  describe("Incorrect Password given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/user/login").send({
        email: "testuser@gmail.com",
        password: "testuser",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/user/login").send({
        email: "testuser@gmail.com",
        password: "testuser",
      });
      expect(response.body.error).toBeDefined();
    });
  });

  describe("Email and Password missing", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/user/login").send({});
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/user/login").send({});
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("POST - /user/signup", () => {
  describe("All required values given", () => {
    beforeAll(async () => {
      await User.deleteMany({ status: 0 });
    });
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/user/signup").send({
        firstName: "Temp",
        lastName: "User",
        email: "tempuser@gmail.com",
        password: "tempuser123",
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Email already exists", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).post("/user/signup").send({
        firstName: "Temp",
        lastName: "User",
        email: "tempuser@gmail.com",
        password: "tempuser123",
      });
      expect(response.statusCode).toBe(500);
    });
  });

  describe("Any required field is missing", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).post("/user/signup").send({
        firstName: "Temp",
        lastName: "User",
      });
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/user/signup").send({
        firstName: "Temp",
        lastName: "User",
      });
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("POST - /user/auth", () => {
  describe("User token given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/user/auth").send({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFmODFiMGIzMzE1ZTIzN2NmZWY4YTQiLCJpYXQiOjE2MjIxMTQ5OTJ9.kGrRWjEAlTbnoPSoLTMEuYPCdtz_fFURL_E2wEty4-g",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with user details", async () => {
      const response = await request(app).post("/user/auth").send({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFmODFiMGIzMzE1ZTIzN2NmZWY4YTQiLCJpYXQiOjE2MjIxMTQ5OTJ9.kGrRWjEAlTbnoPSoLTMEuYPCdtz_fFURL_E2wEty4-g",
      });
      expect(response.body._id).toBeDefined();
    });
  });

  describe("User token missing", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/user/auth").send({});
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/user/auth").send({});
      expect(response.body.error).toBeDefined();
    });
  });

  describe("User token invalid", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/user/auth").send({
        token: "12345",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/user/auth").send({
        token: "12345",
      });
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("PUT - /user/:userId", () => {
  describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const _id = "60af81b0b3315e237cfef8a4";
      const lastName = `User#${Math.floor(Math.random() * 10000)}`;
      const response = await request(app)
        .put("/user/60af81b0b3315e237cfef8a4")
        .send({
          _id,
          lastName,
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with a status code of 200", async () => {
      const _id = "60af81b0b3315e237cfef8a4";
      const lastName = `User#${Math.floor(Math.random() * 10000)}`;
      const response = await request(app)
        .put("/user/60af81b0b3315e237cfef8a4")
        .send({
          _id,
          lastName,
        });
      expect(response.body._id).toBeDefined();
    });
  });

  describe("Any required values missing", () => {
    test("Should respond with a status code of 400", async () => {
      const _id = "60af81b0b3315e237cfef8a4";
      const lastName = "";
      const response = await request(app)
        .put("/user/60af81b0b3315e237cfef8a4")
        .send({
          _id,
          lastName,
        });
      expect(response.statusCode).toBe(400);
    });

    test("Should respond with error", async () => {
      const _id = "60af81b0b3315e237cfef8a4";
      const lastName = "";
      const response = await request(app)
        .put("/user/60af81b0b3315e237cfef8a4")
        .send({
          _id,
          lastName,
        });
      expect(response.body.error).toBeDefined();
    });
  });

  describe("New Password Provided", () => {
    test("Should respond with a status code of 200", async () => {
      const _id = "60af81b0b3315e237cfef8a4";
      const password = `testuser123`;
      const response = await request(app)
        .put("/user/60af81b0b3315e237cfef8a4")
        .send({
          _id,
          password,
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with a status code of 200", async () => {
      const _id = "60af81b0b3315e237cfef8a4";
      const password = `testuser123`;
      const response = await request(app)
        .put("/user/60af81b0b3315e237cfef8a4")
        .send({
          _id,
          password,
        });
      expect(response.body._id).toBeDefined();
    });
  });
});

describe("GET - /user/:userId", () => {
  describe("Valid User Id Provided", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).get("/user/60af81b0b3315e237cfef8a4");
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with an array", async () => {
      const response = await request(app).get("/user/60af81b0b3315e237cfef8a4");
      expect(response.body.firstName).toBeDefined();
    });
  });

  describe("Invalid Valid User Id Provided", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).get("/user/123");
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with an error", async () => {
      const response = await request(app).get("/user/123");
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("DELETE - /user/:userId", () => {
  describe("Wrong Values Provided", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).delete("/user/123").send({
        _id: "123",
      });
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with error", async () => {
      const response = await request(app).delete("/user/123").send({
        _id: "123",
      });
      expect(response.body.error).toBeDefined();
    });
  });

  /*   describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .delete("/user/60af85e3418c0327a8ac1c62")
        .send({
          _id: "60af85e3418c0327a8ac1c62",
        });
      expect(response.statusCode).toBe(200);
    });
  }); */
});
