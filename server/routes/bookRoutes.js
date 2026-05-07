const express = require("express");
const router = express.Router();
const {
  addBook,
  getBook,
  getBooks,
  editBook,
  deleteBook,
  requestBorrowBook,
  acceptRejectRequestBorrowBook,
} = require("../controllers/bookController");
const protect = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/upload");

router.post(
  "/",
  protect,
  roleMiddleware("admin"),
  upload.fields([
    { name: "bookCoverImage", maxCount: 1 },
    {
      name: "bookImages",
      maxCount: 5,
    },
  ]),
  addBook,
);

router.get("/", protect, getBooks);
router.get("/:bookId", protect, getBook);
// router.get("/:bookTitle");

router.put(
  `/:bookId`,
  protect,
  roleMiddleware("admin"),
  upload.fields([
    { name: "bookCoverImage", maxCount: 1 },
    { name: "bookImages", maxCount: 5 },
  ]),
  editBook,
);

router.delete(`/:bookId`, protect, roleMiddleware("admin"), deleteBook);

module.exports = router;
