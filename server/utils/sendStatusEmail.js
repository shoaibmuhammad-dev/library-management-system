const getStatusMessage = (status) => {
  const messages = {
    pending: {
      title: "Your Borrow Request Is Pending",
      message:
        "Your borrow request is currently pending and awaiting further processing.",
    },
    borrowed: {
      title: "Your Borrow Request Has Been Approved",
      message:
        "Good news! Your borrow request has been approved and the book has been marked as borrowed.",
    },
    returned: {
      title: "Book Return Confirmed",
      message:
        "Your book return has been successfully recorded. Thank you for returning the book.",
    },
    "late-return": {
      title: "Late Return Recorded",
      message:
        "Your book has been recorded as returned after the expected return period.",
    },
    rejected: {
      title: "Your Borrow Request Was Rejected",
      message:
        "Unfortunately, your borrow request has been rejected. Please contact the library if you need further information.",
    },
  };

  return messages[status];
};

module.exports = getStatusMessage;
