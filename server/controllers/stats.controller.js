const Books = require("../models/Book");
const Users = require("../models/User");
const BorrowedBooks = require("../models/borrowRequests");
const asyncHandler = require("../utils/asyncHandler");

exports.getDashboardStats = asyncHandler(async (req, res) => {
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
});
