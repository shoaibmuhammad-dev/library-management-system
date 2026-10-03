export const getStatusStyle = (value) => {
  switch (value) {
    case "pending":
      return "text-orange-500 bg-orange-100";
    case "accepted":
      return "text-green-500 bg-green-100";
    case "borrowed":
      return "text-green-500 bg-green-100";
    case "returned":
      return "text-blue-500 bg-blue-100";
    case "late-return":
      return "text-red-500 bg-red-100";
    case "cancelled":
      return "text-red-500 bg-red-100";
    case "rejected":
      return "text-red-500 bg-red-100";
    case "blocked":
      return "text-red-500 bg-red-100";
    case "suspended":
      return "text-red-500 bg-red-100";
    default:
      return "text-gray-500 bg-gray-100";
  }
};
