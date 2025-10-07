const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "about", "skills", "age", "gender"];

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const allConnections = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const connectionRequestUserData = allConnections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    if (!allConnections.length) {
      throw new Error("No Connections found.");
    }

    res.status(200).json({
      message: "All Connections.",
      data: connectionRequestUserData,
    });
  } catch (error) {
    res.status(400).json({ message: `Some Error Occurred: ${error.message}` });
  }
});

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const allRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    if (!allRequests.length) {
      throw new Error("No Connection Request found.");
    }

    res.status(200).json({
      message: "All Connection Requests.",
      data: allRequests,
    });
  } catch (error) {
    res.status(400).json({ message: `Some Error Occurred: ${error.message}` });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // filter self, interested user, accepted user, ignored user, rejected user

    const page = parseInt(req.query.page) || 1; // page num
    const limit = parseInt(req.query.limit) > 50 ? 5 : parseInt(req.query.limit); // how many docs I want
    const skip = (page - 1) * limit; // how many documents I want to skip

    // find all connection req user has sent or receieved
    const allConnectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select(["fromUserId", "toUserId"]);

    // userIds of all users whom user has sent or receieved req from
    const hideUsersFromFeed = new Set();
    allConnectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    // finding all user not in hideUsersFromFeed set and not self.
    const allUsers = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(hideUsersFromFeed) },
        },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Your possible matches.",
      data: allUsers,
    });
  } catch (error) {
    res.status(400).json({ message: `Some Error Occurred: ${error.message}` });
  }
});

module.exports = userRouter;
