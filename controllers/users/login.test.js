const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

const app = require("../../app");

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(DB_HOST).then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  });
});

/* Dropping the database and closing connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/users/login", () => {
  test("The login route with the user", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "albuska@g.com",
      password: "233G7f*f",
    });

    expect(response.status).toBe(200);
    expect(typeof response.body === "object").toBe(true);
    expect(typeof response.body.user.email).toBe("string");

    expect(typeof response.body.user.subscription).toBe("string");
    expect(response.body.token).toBeTruthy();
  });
});
