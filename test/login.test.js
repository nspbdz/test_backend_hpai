// __tests__/auth.test.js

const request = require("supertest");
const app = require("../index"); // Replace '../app' with the correct path to your app.js file

describe("POST /api/v1/login", () => {
  it("should return a JWT token when valid credentials are provided", async () => {
    const response = await request(app).post("/api/v1/login").send({
      email: "user@example.com",
      password: "12345678",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data.token"); // Assuming your login controller returns a 'token' property in the response
  });

  it("should return an error when invalid credentials are provided", async () => {
    const response = await request(app).post("/api/v1/login").send({
      email: "user@example.com",
      password: "invalidpassword",
    });
    console.log("status");
    expect(response.status).toBe(401);
    expect(response.body.status).toBe("failed"); // Assuming your login controller returns an 'error' property in the response
  });
});
