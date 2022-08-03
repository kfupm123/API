const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    id: { type: String, unique: true, required: true },
    score: { type: Number, default: 0 },
    status: { type: String, enum: ["onDelivery", "offDelivery"] },
    warning: { type: String, enum: ["high", "medium", "low"], default: "low" },
    role: {
      type: String,
      enum: ["admin", "driver", "cc"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
