const crypto = require("crypto");

const generateOtp = () => {
  const random = crypto.randomInt(0, 100000).toString().padStart(5, "0");
  return random;
};

module.exports = generateOtp;
