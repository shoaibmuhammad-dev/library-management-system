const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");

exports.registerUser = asyncHandler(async (req, res) => {
  const data = await authService.register(req.body);
  res.status(201).json(data);
});

exports.loginUser = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  res.status(200).json(data);
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const data = await authService.forgotPassword(req.body);
  res.status(200).json(data);
});

exports.verifyOtp = asyncHandler(async (req, res) => {
  const data = await authService.verifyOtp(req.body);
  res.status(200).json(data);
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const data = await authService.resetPassword(req.body);
  res.status(200).json(data);
});
