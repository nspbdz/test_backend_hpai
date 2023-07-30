// __tests__/auth.test.js

const request = require("supertest");
const app = require("../index"); // Replace '../app' with the correct path to your app.js file
const jwt = require("jsonwebtoken");

// Function to generate a JWT token (replace this with your actual implementation)
const generateToken = (user) => {
  // Your logic to generate the token
  // For example, using jsonwebtoken library
  return jwt.sign(
    { id: user.id, role: user.role },
    "dsafc97632kdsf0234kjvdsaofy92342bdfre245feg"
  );
};

describe("POST /api/v1/users", () => {
  it("should create a new user when valid data and bearer token are provided", async () => {
    // Generate a Bearer token
    const user = { id: 1, role: "admin" }; // Replace this with the user data for which you want to generate the token
    const token = generateToken(user);

    // Send the request with the Bearer token in the 'Authorization' header
    const response = await request(app)
      .post("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test123",
        email: "1222sj3@example.com",  //jika terdapat error ganti dengan email yang belum terdaftar
        password: "12345678",
        role: "admin",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data.email"); // Assuming your controller returns a 'user' property in the response
  });

  it("should return an error when invalid data is provided", async () => {
    // Generate a Bearer token (same as above)
    const user = { id: 1, role: "admin" }; // Replace this with the user data for which you want to generate the token
    const token = generateToken(user);
    // Send the request with the Bearer token in the 'Authorization' header
    const response = await request(app)
      .post("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        // Invalid data, missing required fields, etc.
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error"); // Assuming your controller returns an 'error' property in the response
  });
});
