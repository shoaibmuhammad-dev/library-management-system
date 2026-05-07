const requestService = require("../services/requestService");
const BorrowRequests = require("../models/borrowRequests");

// request to borrow a book
exports.requestBorrowBook = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookId = req.params.bookId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const result = await requestService.requestBorrowBook(userId, bookId);

    res.status(201).json({
      message: "Request submitted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    // console.error("err while submitting request >>>>", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// accept or reject borrow request submitted by a student
exports.acceptRejectRequestBorrowBook = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const { status } = req.body;
    if (!requestId) {
      return res.status(400).json({ message: "Request ID is required" });
    }
    if (!status) {
      return res.status(400).json({ message: "Request status is required" });
    }

    const allowedStatus = ["pending", "borrowed", "returned", "late-return"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const updatedRequest = await requestService.updateRequestStatus(
      requestId,
      status,
    );

    return res
      .status(200)
      .json({ message: "Status updated successfully!", data: updatedRequest });
  } catch (error) {
    console.error("Err while changing request status >>>>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get all requests - admin only
exports.getRequests = async (req, res) => {
  try {
    const { search, page, limit, status } = req.query;
    const requests = await requestService.getBorrowRequests({
      search,
      page,
      limit,
      status,
    });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getUserBorrowedBooks = async (req, res) => {
  try {
    const user = req.user;
    const { status } = req.query;

    const books = await requestService.getUserBorrowedBooks({
      user,
      status,
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
