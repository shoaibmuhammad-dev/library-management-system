const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getUsers,
  updateUserRole,
  deleteUser,
  approveUserProfile,
  getUser,
  updateProfileController,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/upload.middleware");

// update user profile
router.put(
  "/edit-profile",
  protect,
  upload.single("profileImage"),
  updateProfileController,
);

// get logged in user profile
router.get("/profile", protect, getUserProfile);

// get all users
router.get("/", protect, roleMiddleware("admin"), getUsers);

// update user role (admin only)
router.put(`/:userId`, protect, roleMiddleware("admin"), updateUserRole);

// get user profile
router.get(`/:userId`, protect, roleMiddleware("admin"), getUser);

// delete user
router.delete(`/:userId`, protect, roleMiddleware("admin"), deleteUser);

// approve/reject user account (admin only)
router.put(
  `/:userId/status`,
  protect,
  roleMiddleware("admin"),
  approveUserProfile,
);

module.exports = router;
