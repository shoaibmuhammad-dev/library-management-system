const express = require("express");
const protect = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
  requestBorrowBook,
  acceptRejectRequestBorrowBook,
  getRequests,
  getUserBorrowedBooks,
} = require("../controllers/request.controller");
const verifyAccount = require("../middlewares/accountStatusMiddleware");
const router = express.Router();

router.get("/", protect, getRequests);
router.post(`/:bookId`, protect, verifyAccount, requestBorrowBook);
router.patch(
  `/:requestId/status`,
  protect,
  roleMiddleware("admin"),
  acceptRejectRequestBorrowBook,
);
router.get("/borrowed", protect, getUserBorrowedBooks);

module.exports = router;
