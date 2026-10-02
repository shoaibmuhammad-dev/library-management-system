const BorrowRequests = require("../models/borrowRequests");
const sendEmail = require("../utils/email");
const ApiError = require("../utils/errorHandler");
const getStatusMessage = require("../utils/sendStatusEmail");

// submit a request to borrow a book
const requestBorrowBook = async (userId, bookId) => {
  const existingRequest = await BorrowRequests.findOne({
    user: userId,
    book: bookId,
    status: { $in: ["pending", "borrowed"] },
  });

  if (existingRequest) {
    throw new ApiError(
      "You already have a pending or borrowed request for this book.",
      409,
    );
  }

  const borrowRequest = await BorrowRequests.create({
    user: userId,
    book: bookId,
    status: "pending",
    borrowedDate: null,
    startDate: null,
    returnDate: null,
  });

  return borrowRequest;
};

// update request admin only
const updateRequestStatus = async (requestId, status) => {
  if (!requestId) {
    throw new ApiError("Request ID is required", 400);
  }
  if (!status) {
    throw new ApiError("Request status is required", 400);
  }

  const allowedStatus = [
    "pending",
    "borrowed",
    "returned",
    "late-return",
    "rejected",
  ];

  if (!allowedStatus.includes(status)) {
    throw new ApiError("Invalid status");
  }

  const request = await BorrowRequests.findById(requestId).populate(
    "user",
    "email",
  );

  if (!request) {
    throw new ApiError("Request not found!", 404);
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

  if (request?.user?.email) {
    const statusInfo = getStatusMessage(status);

    if (request?.user?.email) {
      await sendEmail(
        request.user.email,
        statusInfo.title,
        `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background-color: #f4f6f8;
          font-family: Arial, Helvetica, sans-serif;
          color: #333333;
        ">
          <div style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          ">

            <!-- Header -->
            <div style="
              padding: 24px 30px;
              background-color: #111827;
              color: #ffffff;
            ">
              <h1 style="
                margin: 0;
                font-size: 22px;
                font-weight: 600;
              ">
                Library Management System
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 35px 30px;">

              <h2 style="
                margin-top: 0;
                margin-bottom: 15px;
                font-size: 22px;
                color: #111827;
              ">
                ${statusInfo.title}
              </h2>

              <p style="
                font-size: 15px;
                line-height: 1.7;
                margin-bottom: 25px;
                color: #4b5563;
              ">
                ${statusInfo.message}
              </p>

              <!-- Status -->
              <div style="
                padding: 18px;
                background-color: #f9fafb;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                margin-bottom: 25px;
              ">
                <p style="
                  margin: 0 0 8px;
                  font-size: 13px;
                  color: #6b7280;
                ">
                  Current Request Status
                </p>

                <p style="
                  margin: 0;
                  font-size: 18px;
                  font-weight: 600;
                  color: #111827;
                  text-transform: capitalize;
                ">
                  ${status === "borrowed" ? "Accepted / Borrowed" : status}
                </p>
              </div>

              <p style="
                font-size: 14px;
                line-height: 1.7;
                color: #6b7280;
              ">
                This is an automated notification regarding your library
                borrow request. If you believe this status is incorrect or
                have any questions, please contact the library administration.
              </p>

              <p style="
                margin-top: 30px;
                font-size: 14px;
                color: #374151;
              ">
                Regards,<br />
                <strong>Library Administration</strong>
              </p>

            </div>

            <!-- Footer -->
            <div style="
              padding: 18px 30px;
              background-color: #f9fafb;
              border-top: 1px solid #e5e7eb;
              text-align: center;
            ">
              <p style="
                margin: 0;
                font-size: 12px;
                color: #9ca3af;
              ">
                This is an automated email. Please do not reply directly to this message.
              </p>
            </div>

          </div>
        </body>
      </html>
    `,
      );
    }
  }

  const updatedRequest = await BorrowRequests.findByIdAndUpdate(
    requestId,
    updateData,
    { new: true },
  );

  return updatedRequest;
};

// get requests
const getBorrowRequests = async ({
  search,
  page = 1,
  limit = 10,
  status,
  user,
}) => {
  const matchStage = {};

  // Status filter
  if (status) {
    matchStage.status = status;
  }

  // Students can only see their own requests
  if (user?.role === "student") {
    matchStage.user = user._id;
  }

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
    { $limit: limitNumber },
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
// get borrowed books
const getUserBorrowedBooks = async ({ user, status = "borrowed" }) => {
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

// cancel borrow request - student only
const cancelBorrowRequest = async (requestId, userId) => {
  const request = await BorrowRequests.findOne({
    _id: requestId,
    user: userId,
  });

  if (!request) {
    throw new Error("Borrow request not found!", 404);
  }

  // Student can only cancel pending requests
  if (request.status !== "pending") {
    throw new Error(`You cannot cancel a ${request.status} request.`, 400);
  }

  request.status = "cancelled";

  await request.save();

  return request;
};

module.exports = {
  requestBorrowBook,
  updateRequestStatus,
  getBorrowRequests,
  getUserBorrowedBooks,
  cancelBorrowRequest,
};
