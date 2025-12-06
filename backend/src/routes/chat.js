const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { Chat } = require("../models/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const userId = req.user._id;

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({ path: "messages.senderId", select: "firstName lastName" });

    if (!chat) {
      chat = new Chat({ participants: [userId, targetUserId], messages: [] });
      await chat.save();
    }

    res.status(200).json({ message: "Chat created successfully", data: chat });
  } catch (error) {
    res.status(400).json({ message: `Some Error Occured ${error}`, data: {} });
  }
});

module.exports = chatRouter;
