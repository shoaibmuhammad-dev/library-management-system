const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    dateOfBirth: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    department: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    idNumber: {
      type: String,
      unique: true,
      required: function () {
        return this.role === "student";
      },
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "student", "manager"],
      default: "student",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected", "deleted"],
    },
    booksBorrowedCount: { type: Number, default: 0 },
    booksBorrowed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
        required: function () {
          return this.role === "student";
        },
      },
    ],
    profilePicture: { type: String, required: false, default: null },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// increment the book count
userSchema.pre("save", function (next) {
  this.booksBorrowedCount = this.booksBorrowed?.length || 0;
  next();
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
