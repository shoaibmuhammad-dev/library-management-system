const userService = require("../services/userService");
const Users = require("../models/User");
const sendEmail = require("../utils/email");
const asyncHandler = require("../utils/asyncHandler");

exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user.id);
  res.status(200).json(user);
});

exports.getUsers = asyncHandler(async (req, res) => {
  const { search, page, limit, role, status } = req.query;

  const users = await userService.getUsers({
    search,
    page,
    limit,
    role,
    status,
  });

  res.json(users);
});

exports.getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  const user = await Users.findById(userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.status(200).json({ message: "User fetched successfully", user });
});

exports.updateUserRole = asyncHandler(async (req, res) => {
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
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
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
});

exports.approveUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const { status } = req.body;

  const updatedUser = await userService.approveUserProfile(userId, status);

  await sendEmail(
    updatedUser.email,
    `Account ${updatedUser.status}`,
    `
    <h2>Your account has been approved!</h2>
    <p>You can now submit requests to borrow books.</p>
  `,
  );

  res.status(200).json({
    message: `Account ${status} successfully.`,
    data: updatedUser,
  });
});

exports.updateProfileController = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const file = req.file;
  const data = req.body;

  const updatedUser = await userService.updateUserProfile(userId, data, file);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});
