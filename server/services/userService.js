const User = require("../models/User");
const BorrowRequests = require("../models/borrowRequests");
const cloudinary = require("../utils/cloudinary");

const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return user;
};

const getUsers = async ({ search, page, limit, role, status }) => {
  const query = {};

  // -------- ROLE FILTER --------
  if (role) {
    query.role = { $in: role.split(",") }; // supports multiple roles
  } else {
    query.role = { $in: ["student", "manager"] };
  }

  // -------- STATUS FILTER --------
  if (status) {
    query.status = status; // pending | accepted | rejected
  }

  // -------- SEARCH FILTER --------
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { idNumber: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } },
    ];
  }

  // -------- PAGINATION --------
  page = Number(page) || 1;
  limit = Number(limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find(query)
    .select("-password")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  return {
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const updateUserRole = async (userId, role) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { role: role },
    { new: true },
  ).select("-password");
  return user;
};

const approveUserProfile = async (userId, status) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { status },
    { new: true },
  ).select("-password");
  return user;
};

const updateUserProfile = async (userId, data, file) => {
  let profileImageUrl;

  if (file) {
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_pictures" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        stream.end(file.buffer);
      });

    const uploaded = await streamUpload();

    profileImageUrl = uploaded.secure_url;
  }

  const updateData = {
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    phoneNumber: data.phoneNumber,
    department: data.department,
  };

  if (profileImageUrl) {
    updateData.profilePicture = profileImageUrl;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true },
  );

  return updatedUser;
};

module.exports = {
  getProfile,
  getUsers,
  updateUserRole,
  approveUserProfile,
  updateUserProfile,
};
