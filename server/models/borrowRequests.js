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
    returnDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ["pending", "borrowed", "returned", "late-return"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BorrowRequests", borrowRequests);
