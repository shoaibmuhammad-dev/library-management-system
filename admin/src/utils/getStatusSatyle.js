export const getStatusStyle = (value) => {
  switch (value) {
    case "pending":
      return "text-orange-400 bg-orange-100";
    case "borrowed":
      return "text-purple-400 bg-purple-100";
    case "returned":
      return "text-blue-400 bg-blue-100";
    case "late-return":
      return "text-red-400 bg-red-100";
    default:
      return "text-gray-400 bg-gray-100";
  }
};
