require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./src/routes");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

// Tambahkan kondisi untuk hanya menjalankan server jika file ini dijalankan secara langsung, bukan di-import oleh file lain
if (require.main === module) {
  app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
  });
}

module.exports = app;
