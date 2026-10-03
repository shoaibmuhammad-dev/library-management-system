export const formatDate = (dateString, options = {}) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const defaultOptions = {
    year: "numeric",
    month: "short", // "Jan", "Feb"... change to "long" for full name
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
  };

  return date.toLocaleString("en-US", { ...defaultOptions, ...options });
};
