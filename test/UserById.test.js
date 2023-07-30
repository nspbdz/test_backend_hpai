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

describe("GET /api/v1/user/1", () => {
  it("should create a  user by id  when valid data and bearer token are provided", async () => {
    // Generate a Bearer token
    const user = { id: 1, role: "admin" }; // Replace this with the user data for which you want to generate the token
    const token = generateToken(user);
    const id = 1; // jika error diganti saja dengan id user yang masih ada

    // Send the request with the Bearer token in the 'Authorization' header
    const response = await request(app)
      .get(`/api/v1/user/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success..."); // Memastikan status "success"
    expect(response.body.data.id).toBe(id); // Memastikan respons memiliki ID yang sesuai dengan yang diuji
    expect(response.body.data.name).toBeDefined(); // Pastikan name didefinisikan
    expect(response.body.data.email).toBeDefined(); // Pastikan email didefinisikan
    expect(response.body.data.role).toBeDefined(); // Pastikan role didefinisikan
  });

  it("should return 404 if user is not found", async () => {
    const user = { id: 1, role: "admin" }; // Replace this with the user data for which you want to generate the token
    const token = generateToken(user);
    const id = 9999; // jika error diganti saja dengan id user yang masih ada

    // Send the request with the Bearer token in the 'Authorization' header
    const response = await request(app)
      .get(`/api/v1/user/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found"); // Memastikan pesan error yang sesuai
  });
});
