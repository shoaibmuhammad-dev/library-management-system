const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");

exports.registerUser = asyncHandler(async (req, res) => {
  const data = await authService.register(req.body);
  return res.status(201).json(data);
});

exports.loginUser = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  return res.status(200).json(data);
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const data = await authService.forgotPassword(req.body);
  return res.status(200).json(data);
});

exports.verifyOtp = asyncHandler(async (req, res) => {
  const data = await authService.verifyOtp(req.body);
  return res.status(200).json(data);
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const data = await authService.resetPassword(req.body);
  return res.status(200).json(data);
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.id);
  return res.status(200).json(user);
});
