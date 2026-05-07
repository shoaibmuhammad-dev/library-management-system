const Books = require("../models/Book");
const Users = require("../models/User");
const BorrowedBooks = require("../models/borrowRequests");

exports.getDashboardStats = async (req, res) => {
  try {
    const books = await Books.countDocuments();
    const users = await Users.countDocuments({ role: "student" });
    const requests = await BorrowedBooks.countDocuments({ status: "borrowed" });

    res.status(200).json({
      message: "Stats fetched successfully.",
      data: {
        books: books,
        users: users,
        requests: requests,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong on server." });
  }
};
