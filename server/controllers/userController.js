const userService = require("../services/userService");
const Users = require("../models/User");
const sendEmail = require("../utils/email");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { search, page, limit, role, status } = req.query;

    const users = await userService.getUsers({
      search,
      page,
      limit,
      role,
      status,
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await Users.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { role } = req.body;
    if (!userId) {
      throw new Error("User id is required");
    }
    if (!role) {
      throw new Error("role is required");
    }

    const updatedUser = await userService.updateUserRole(userId, role);

    if (!updatedUser) {
      return res.status(404).json({ message: "USer not found" });
    }

    res
      .status(200)
      .json({ message: "User role updated successfully", data: updatedUser });
  } catch (error) {
    console.error("err while updating user role:  ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      // throw new Error("User id is required");
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    await Users.findByIdAndDelete(userId);
    await sendEmail(
      user.email,
      `Account Deleted`,
      `
      <h2>Your account has been deleted!</h2>
      `,
    );
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("err while deleting user >>>>>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.approveUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ message: "User profile status is required" });
    }
    const isUser = await Users.findById(userId);
    if (!isUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const updatedUser = await userService.approveUserProfile(userId, status);

    await sendEmail(
      updatedUser.email,
      `Account ${status}`,
      `
      <h2>Your account has been approved!</h2>
    <p>You can now log in to your account.</p>
    `,
    );

    res.status(200).json({
      message: `Account ${status} successfully.`,
      data: updatedUser,
    });
  } catch (error) {
    console.error("err while approving profile >>>>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateProfileController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const file = req.file;
    const data = req.body;

    const updatedUser = await userService.updateUserProfile(userId, data, file);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
