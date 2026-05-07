const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { getDashboardStats } = require("../controllers/stats.controller");

router.get("/stats", protect, roleMiddleware("admin"), getDashboardStats);

module.exports = router;
