const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    severity: { type: String, enum: ["high", "medium", "low"] },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },
    id: { type: String, unique: true, required: true },
    generatedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Warning", userSchema);
