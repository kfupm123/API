const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const customerSchema = mongoose.Schema({
  name: {
    type: String,
  },
  contact: {
    type: String,
  },
});
const userSchema = new mongoose.Schema(
  {
    EDD: { type: Date, required: true },
    RTA: { type: String, required: true },
    id: { type: String, unique: true, required: true },
    lastLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    priority: {
      type: String,
      default: "low",
      enum: ["high", "medium", "low"],
      required: true,
    },
    status: {
      type: String,
      default: "inWarehouse",
      enum: ["inWarehouse", "inTransit", "delivered", "missDelivered"],
    },
    deliveredBy: {
      type: ObjectId,
      ref: "User",
    },
    customer: customerSchema,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Package", userSchema);
