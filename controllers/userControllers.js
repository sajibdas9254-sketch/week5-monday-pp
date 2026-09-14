const User = require("../models/userModel");

// GET /users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// POST /users
const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    // Duplicate email or invalid schema data
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid user data",
        errors: error.errors,
      });
    }

    next(error);
  }
};

// GET /users/:userId
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// PUT /users/:userId
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    next(error);
  }
};

// DELETE /users/:userId
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};