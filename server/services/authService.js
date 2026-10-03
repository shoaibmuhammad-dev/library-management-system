const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/errorHandler");
const sendEmail = require("../utils/email");
const generateOtp = require("../utils/generateOtp");
const crypto = require("crypto");
const verificationCodeTemplate = require("../utils/sendForgotPasswordCode");
const bcrypt = require("bcryptjs");

const register = async ({
  firstName,
  lastName,
  email,
  password,
  idNumber,
  role = "student",
  isApproved = true,
  phoneNumber,
  dateOfBirth,
  department,
}) => {
  const existingUser = await User.findOne({ email });

  if (existingUser)
    throw new ApiError(
      `An account with '${existingUser.email}' email already exists`,
      400,
    );

  if (role === "admin") {
    if (!idNumber) {
      idNumber = null;
    }

    isApproved = "accepted";
  } else if (role === "student") {
    if (!idNumber) throw new Error("ID is required.");
    idNumber = String(idNumber);
    if (!/^\d{13}$/.test(idNumber)) {
      throw new Error("ID must contain exactly 13 digits.");
    }
    isApproved = "pending";

    const existingId = await User.findOne({ idNumber });
    if (existingId) throw new ApiError("ID is already registered!", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    idNumber,
    role,
    status: isApproved,
    phoneNumber,
    dateOfBirth,
    department,
  });

  return {
    success: true,
    message: `Account created successfully.`,

    data: {
      id: user._id,
      firstName,
      lastName,
      email: user.email,
      role: user.role,
      idNumber: user.idNumber,
      status: user.status,
      phoneNumber,
      dateOfBirth,
      department,
    },
    token: generateToken(user._id),
  };
};

const login = async ({ email, password, role }) => {
  const user = await User.findOne({ email });

  const restrictedStatuses = ["rejected", "blocked", "suspended", "deleted"];

  if (restrictedStatuses.includes(user.status)) {
    throw new ApiError(
      `Your account is ${user.status}. Please contact the library administrator.`,
      403,
    );
  }

  if (role !== user.role) {
    throw new ApiError("Invalid email or password.", 400);
  }

  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError("Invalid email or password.", 400);
  }

  return {
    success: true,
    message: "Login successfull",
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      idNumber: user.idNumber,
      role: user.role,
      status: user.status,
      booksBorrowedCount: user.booksBorrowedCount,
    },
    token: generateToken(user._id),
  };
};

const forgotPassword = async (data) => {
  const { email } = data;

  if (!email) {
    throw new ApiError("Email is required", 400);
  }

  const user = await User.findOne({ email });

  if (user) {
    const otp = generateOtp();
    user.resetOtp = otp;
    user.resetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();
    const template = verificationCodeTemplate(otp);

    await sendEmail(email, "Password Reset Verification Code", template);
  }

  return {
    success: true,
    message:
      "If an account exists with this email, we have sent a verification code.",
  };
};

const verifyOtp = async (data) => {
  const { email, otp } = data;

  if (!email || !otp) {
    throw new ApiError("Email and OTP is required", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError("Invalid verification code!", 400);
  }

  if (!user.resetOtp || !user.resetOtpExpiresAt) {
    throw new ApiError("Verification code is invalid or expired!", 400);
  }

  if (new Date() > user.resetOtpExpiresAt) {
    user.resetOtp = null;
    user.resetOtpExpiresAt = null;
    await user.save();

    throw new ApiError("Verification code has expired!", 400);
  }

  if (user.resetOtp !== otp) {
    throw new ApiError("Invalid verification code", 400);
  }

  user.resetOtp = null;
  user.resetOtpExpiresAt = null;

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  return {
    success: true,
    message: "OTP has been verified successfully",
    resetToken,
  };
};

const resetPassword = async (data) => {
  const { resetToken, newPassword } = data;

  if (!resetToken || !newPassword)
    throw new ApiError("Reset token and new password are required", 400);

  // Hash the token received from the client
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Find user using the hashed reset token
  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiresAt: { $gt: new Date() },
  });

  if (!user) throw new ApiError("Invalid or expired reset token", 400);

  // Hash the new password

  user.password = newPassword;
  user.resetToken = null;
  user.resetTokenExpiresAt = null;

  await user.save();

  return { success: true, message: "Password has been reset successfully" };
};

module.exports = {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
