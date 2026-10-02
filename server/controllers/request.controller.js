const requestService = require("../services/requestService");
const asyncHandler = require("../utils/asyncHandler");

// request to borrow a book
exports.requestBorrowBook = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const bookId = req.params.bookId;
  const { startDate, endDate } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (!bookId) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  if (!startDate) {
    return res.status(400).json({ message: "Start date is required" });
  }

  if (!endDate) {
    return res.status(400).json({ message: "Return date is required" });
  }

  const result = await requestService.requestBorrowBook(userId, bookId);

  res.status(201).json({
    message: "Request submitted successfully",
    success: true,
    data: result,
  });
});

// accept or reject borrow request submitted by a student
exports.acceptRejectRequestBorrowBook = asyncHandler(async (req, res) => {
  const requestId = req.params.requestId;
  const { status } = req.body;

  const updatedRequest = await requestService.updateRequestStatus(
    requestId,
    status,
  );

  return res
    .status(200)
    .json({ message: "Status updated successfully!", data: updatedRequest });
});

// get all requests - admin only
exports.getRequests = asyncHandler(async (req, res) => {
  const user = req.user;
  const { search, page, limit, status } = req.query;
  const requests = await requestService.getBorrowRequests({
    search,
    page,
    limit,
    status,
    user,
  });

  res.json(requests);
});

// get all borrowed books - admin & student
exports.getUserBorrowedBooks = asyncHandler(async (req, res) => {
  const user = req.user;
  const { status } = req.query;

  const books = await requestService.getUserBorrowedBooks({
    user,
    status,
  });

  res.json(books);
});

// cancel borrow request - student only
exports.cancelBorrowRequest = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const requestId = req.params.requestId;

  if (!requestId) {
    return res.status(400).json({
      success: false,
      message: "Request ID is required",
    });
  }

  const cancelledRequest = await requestService.cancelBorrowRequest(
    requestId,
    userId,
  );

  return res.status(200).json({
    success: true,
    message: "Borrow request cancelled successfully!",
    data: cancelledRequest,
  });
});
