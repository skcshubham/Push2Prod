const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      default: "INR",
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      emailId: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      membershipType: {
        type: String,
        required: true,
        enum: ["silver", "gold"],
      },
    },
    razorpaySignature: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
