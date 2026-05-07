const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    bookTitle: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    totalBooks: { type: Number, required: true },
    availableBooks: { type: Number, default: 0 },
    bookCoverImage: { type: String, required: true },
    bookImages: { type: Array, required: false },
    bookSummary: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Books", bookSchema);
