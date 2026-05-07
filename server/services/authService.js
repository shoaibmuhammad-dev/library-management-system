const User = require("../models/User");
const generateToken = require("../utils/generateToken");

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
    throw new Error(
      `An account with '${existingUser.email}' email already exists`,
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
    if (existingId) throw new Error("ID is already registered!");
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

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new Error("Invalid email or password.");
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

module.exports = {
  register,
  login,
};
