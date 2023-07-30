const { Router } = require("express");

// Controller
const {  login, checkAuth } = require("../controllers/auth");

const {
  getUsers,
  getDetailUser,
  deleteUser,
  getUserById,
  addUser
} = require("../controllers/user");

const { auth } = require("../middlewares/auth");

const router = Router();

// Route

router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

//user

router.post("/users", auth, addUser);
router.get("/user", auth, getDetailUser);
router.get("/users", auth,getUsers);
router.delete("/users/:id", auth, deleteUser);
router.get("/user/:id",auth, getUserById);

module.exports = router;
