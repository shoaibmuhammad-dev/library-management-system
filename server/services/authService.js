const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/errorHandler");
const sendEmail = require("../utils/email");
const generateOtp = require("../utils/generateOtp");
const crypto = require("crypto");

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

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
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

    await sendEmail(
      email,
      "Password Reset Verification Code",
      `
        <h2>Password Reset</h2>
        <p>Your verification code is:</p>
        <h1>${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
      `,
    );
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

module.exports = {
  register,
  login,
  forgotPassword,
  verifyOtp,
};
