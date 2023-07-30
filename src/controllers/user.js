const { user } = require("../../models");

// import joi validation
const Joi = require("joi");
// import bcrypt
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await user.destroy({
      where: {
        id,
      },
    });

    if (deletedUser === 0) {
      // Jika deletedUser bernilai 0, berarti pengguna dengan ID yang diminta tidak ditemukan
      return res.status(404).json({
        status: "error",
        message: `User with id: ${id} not found`,
      });
    }

    res.send({
      status: "success",
      message: `Delete user id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addUser = async (req, res) => {
  // our validation schema here
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    role: Joi.required(),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const { email, password } = req.body;

    const checkEmail = await user.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      return res.send({
        status: "failed",
        message: "Email Already Registered",
      });
    }

    // we generate salt (random value) with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // we hash password from request with salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    });

    newUser = await user.findOne({
      where: {
        id: newUser.id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    newUser = JSON.parse(JSON.stringify(newUser));

    res.send({
      status: "success...",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

exports.getDetailUser = async (req, res) => {
  try {
    const idUser = req.user.id;
    const { id } = req.params;
    console.log(id);
    let users = await user.findOne({
      where: {
        id: idUser,
      },
      attributes: {
        exclude: ["password", "idUser", "createdAt", "updatedAt"],
      },
    });

    users = JSON.parse(JSON.stringify(users));

    res.send({
      status: "success...",
      data: {
        ...users,
        image: path + users.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let users = await user.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    if (!users) {
      // Jika pengguna tidak ditemukan, kirim respons error 404
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    users = JSON.parse(JSON.stringify(users));

    res.send({
      status: "success...",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
