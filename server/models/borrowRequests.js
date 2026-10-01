const mongoose = require("mongoose");

const borrowRequests = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
    borrowedDate: {
      type: Date,
      default: null,
    },
    startDate: { type: Date, default: null },
    returnDate: { type: Date, default: null },
    status: {
      type: String,
      enum: [
        "pending",
        "borrowed",
        "rejected",
        "returned",
        "late-return",
        "cancelled",
      ],
      default: "pending",
    },
    cancelledBy: { type: String, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BorrowRequests", borrowRequests);
