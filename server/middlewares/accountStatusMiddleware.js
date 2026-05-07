const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyAccount = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User does not exist." });
    }

    if (user.status !== "accepted") {
      return res.status(403).json({
        message:
          "Your account is pending approval. You cannot submit requests yet.",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Session has expired. Please login again.",
    });
  }
};

module.exports = verifyAccount;
