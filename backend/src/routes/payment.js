const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

const membershipTypePrice = {
  silver: 7900,
  gold: 19900,
};

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;

    if (!membershipType || !membershipTypePrice[membershipType]) {
      throw new Error("Invalid membership type selected.");
    }

    const { firstName, lastName } = req.user;
    const emailId = req.user.emailId || req.user.email;

    if (!emailId) {
      throw new Error("User email is missing. Please update your profile.");
    }

    const customerNotes = {
      firstName,
      lastName,
      emailId,
      membershipType,
    };

    const order = await razorpayInstance.orders.create({
      amount: membershipTypePrice[membershipType],
      currency: "INR",
      partial_payment: false,
      notes: customerNotes,
    });

    // save it into db
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status || "created",
      notes: customerNotes,
    });

    const savedPayment = await payment.save();

    // return order details to frontend
    res.status(200).json({
      message: "order created successfully.",
      data: savedPayment,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Some Error Occurred: ${error.message}`, data: {} });
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      throw new Error("Webhook Signature is Invalid");
    }

    // update payment status in DB
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;

    await payment.save();

    // make user premium
    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;

    await user.save();

    // return success response to razorpay
    return res
      .status(200)
      .json({ message: `Webhook received successfully.`, data: {} });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Some Error Occurred: ${error.message}`, data: {} });
  }
});

module.exports = paymentRouter;
