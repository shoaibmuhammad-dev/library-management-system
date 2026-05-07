const BorrowRequests = require("../models/borrowRequests");

// submit a request to borrow a book
const requestBorrowBook = async (userId, bookId) => {
  const existingRequest = await BorrowRequests.findOne({
    user: userId,
    book: bookId,
    status: { $in: ["pending", "borrowed"] },
  });

  if (existingRequest) {
    const error = new Error(
      "You already have a pending or borrowed request for this book.",
    );
    error.statusCode = 409;
    throw error;
  }

  const borrowRequest = await BorrowRequests.create({
    user: userId,
    book: bookId,
    status: "pending",
    borrowedDate: null,
    returnDate: null,
  });

  return borrowRequest;
};

// update request admin only
const updateRequestStatus = async (requestId, status) => {
  const request = await BorrowRequests.findById(requestId);
  if (!request) {
    const error = new Error("Request not found!");
    error.statusCode = 404;
    throw error;
  }

  const currentDate = new Date();

  let updateData = { status };

  switch (status) {
    case "borrowed":
      updateData.borrowedDate = currentDate;
      updateData.returnDate = null;
      break;

    case "returned":
      updateData.returnDate = currentDate;
      break;

    case "rejected":
      updateData.borrowedDate = null;
      updateData.returnDate = null;
      break;

    case "late-return":
      updateData.borrowedDate = null;
      updateData.returnDate = currentDate;
      break;

    case "pending":
      updateData.borrowedDate = null;
      updateData.returnDate = null;
      break;

    default:
      throw new Error("Invalid status update");
  }

  const updatedRequest = await BorrowRequests.findByIdAndUpdate(
    requestId,
    updateData,
    { new: true },
  );

  return updatedRequest;
};

const getBorrowRequests = async ({ search, page = 1, limit = 10, status }) => {
  const matchStage = {};
  if (status) matchStage.status = status;

  // ensure numbers
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const searchRegex = search ? new RegExp(search, "i") : null;

  const pipeline = [
    { $match: matchStage },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $lookup: {
        from: "books",
        localField: "book",
        foreignField: "_id",
        as: "book",
      },
    },
    { $unwind: "$book" },
    ...(searchRegex
      ? [
          {
            $match: {
              $or: [
                { "user.name": { $regex: searchRegex } },
                { "user.email": { $regex: searchRegex } },
                { "book.title": { $regex: searchRegex } },
                { "book.author": { $regex: searchRegex } },
              ],
            },
          },
        ]
      : []),
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limitNumber }, // <-- must be a number
  ];

  const requests = await BorrowRequests.aggregate(pipeline);

  // Count total for pagination
  const countPipeline = [
    { $match: matchStage },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $lookup: {
        from: "books",
        localField: "book",
        foreignField: "_id",
        as: "book",
      },
    },
    { $unwind: "$book" },
    ...(searchRegex
      ? [
          {
            $match: {
              $or: [
                { "user.name": { $regex: searchRegex } },
                { "user.email": { $regex: searchRegex } },
                { "book.title": { $regex: searchRegex } },
                { "book.author": { $regex: searchRegex } },
              ],
            },
          },
        ]
      : []),
    { $count: "total" },
  ];

  const totalCountResult = await BorrowRequests.aggregate(countPipeline);
  const total = totalCountResult[0]?.total || 0;

  return {
    data: requests,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

const getUserBorrowedBooks = async ({ user, status }) => {
  const query = { user: user._id };

  if (status) {
    query.status = status;
  }

  const data = await BorrowRequests.find(query)
    .populate("book")
    .sort({ createdAt: -1 })
    .select("-user -__v");

  return data;
};

module.exports = {
  requestBorrowBook,
  updateRequestStatus,
  getBorrowRequests,
  getUserBorrowedBooks,
};
