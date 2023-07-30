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

describe("GET /api/v1/users", () => {
  it("should create a new user when valid data and bearer token are provided", async () => {
    // Generate a Bearer token
    const user = { id: 1, role: "admin" }; // Replace this with the user data for which you want to generate the token
    const token = generateToken(user);

    // Send the request with the Bearer token in the 'Authorization' header
    const response = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success"); // Memastikan status "success"
    expect(Array.isArray(response.body.data.users)).toBe(true); // Memastikan "data.users" adalah array
  });
});
