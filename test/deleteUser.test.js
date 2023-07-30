const request = require("supertest");
const app = require("../index");
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

describe("DELETE /api/v1/users/:id", () => {
  it("should delete a user by ID", async () => {
    // Generate a Bearer token
    const user = { id: 1, role: "admin" }; // Replace this with the user data for which you want to generate the token
    const token = generateToken(user);
    const id = 12; // jika error diganti saja dengan id user yang masih ada

    // const response = await request(app).delete(`/api/v1/users/1`);
    const response = await request(app)
      .delete(`/api/v1/users/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success"); // Memastikan status "success"
    expect(response.body.message).toBe(`Delete user id: ${id} finished`); // Memastikan pesan sukses yang sesuai
  });

  it("should return 404 if user is not found", async () => {
    const user = { id: 1, role: "admin" }; // Replace this with the user data for which you want to generate the token
    const token = generateToken(user);
    const id = 999;

    const response = await request(app)
      .delete(`/api/v1/users/` + id)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("error"); // Memastikan status "error" karena pengguna tidak ditemukan
    expect(response.body.message).toBe(`User with id: ${id} not found`); // Memastikan pesan error yang sesuai
  });
});
