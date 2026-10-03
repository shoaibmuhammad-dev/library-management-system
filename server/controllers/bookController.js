const bookService = require("../services/bookService");
const Books = require("../models/Book");
const asyncHandler = require("../utils/asyncHandler");

exports.addBook = asyncHandler(async (req, res) => {
  const bookCoverImage = req.files?.bookCoverImage?.[0];

  if (!bookCoverImage) {
    return res
      .status(400)
      .json({ success: false, message: "Book cover image is required" });
  }

  const existingBook = await Books.findOne({
    bookTitle: req.body.bookTitle,
  });

  if (existingBook) {
    return res.status(400).json({
      success: false,
      message: `Book with title ${req.body.bookTitle} already exists.`,
    });
  }

  const data = await bookService.createBook({
    ...req.body,
    bookCoverImage,
  });

  res.status(201).json(data);
});

// get all books
exports.getBooks = asyncHandler(async (req, res) => {
  const { search, department, limit, page } = req.query;
  const books = await bookService.getBooks({
    search,
    department,
    limit,
    page,
  });
  res.status(200).json({ data: books });
});

// get book by id
exports.getBook = asyncHandler(async (req, res) => {
  if (!req.params.bookId) {
    return res.status(400).json({ success: false, message: `ID is required` });
  }

  const book = await bookService.getBook(req.params.bookId);
  if (!book) {
    return res.status(400).json({ success: false, message: `Book not found` });
  }

  res.status(200).json({ data: book });
});

exports.editBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  if (!bookId) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  const bookImages = req.files?.bookImages || [];
  const bookCoverImage = req.files?.bookCoverImage?.[0] || null;

  const existingBookImages = req.body.existingBookImages
    ? JSON.parse(req.body.existingBookImages)
    : [];

  const updatedBook = await bookService.editBook(bookId, {
    ...req.body,
    bookImages,
    bookCoverImage,
    existingBookImages,
  });

  res.status(200).json(updatedBook);
});

// delete a book by id
exports.deleteBook = asyncHandler(async (req, res) => {
  const bookId = req.params.bookId;
  if (!bookId) {
    return res.status(400).json({ message: "Book ID is required." });
  }
  await Books.findByIdAndDelete(bookId);
  res.status(200).json({ message: "Book deleted successfully" });
});
