const authService = require("../services/authService");

exports.registerUser = async (req, res) => {
  try {
    const data = await authService.register(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await authService.getUsers();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
