const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const Payment = require("../models/payment");

const userRouter = express.Router();

const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "about", "skills", "age", "gender"];

/**
 * @swagger
 * /user/connections:
 *   get:
 *     summary: Get all accepted connection requests for the logged-in user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all connection requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: No connection requests found or error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
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

    // Attach membershipType from latest successful payment if any
    const userIds = connectionRequestUserData.map((u) => u._id);
    const payments = await Payment.find({
      userId: { $in: userIds },
      status: { $in: ["paid", "captured", "authorized", "success"] },
    }).sort({ createdAt: -1 });
    const userIdToMembership = new Map();
    for (const p of payments) {
      if (!userIdToMembership.has(String(p.userId))) {
        userIdToMembership.set(String(p.userId), p.notes?.membershipType || null);
      }
    }
    const connectionRequestUserDataWithMembership = connectionRequestUserData.map((u) => {
      const obj = u.toObject ? u.toObject() : u;
      return {
        ...obj,
        membershipType: userIdToMembership.get(String(u._id)) || null,
      };
    });

    if (!allConnections.length) {
      throw new Error("No Connection Requests found.");
    }

    res.status(200).json({
      message: "All Connection Requests.",
      data: connectionRequestUserDataWithMembership,
    });
  } catch (error) {
    res.status(400).json({ message: `Some Error Occurred: ${error.message}`, data: {} });
  }
});

/**
 * @swagger
 * /user/requests/received:
 *   get:
 *     summary: Get all received connection requests (interested status)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all received connection requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: No requests found or error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
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
    res.status(400).json({ message: `Some Error Occurred: ${error.message}`, data: {} });
  }
});

/**
 * @swagger
 * /user/feed:
 *   get:
 *     summary: Get feed of potential matches (users not yet connected with)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 50
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: List of potential matches
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
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

    // Attach membershipType from latest successful payment if any
    const userIds = allUsers.map((u) => u._id);
    const payments = await Payment.find({
      userId: { $in: userIds },
      status: { $in: ["paid", "captured", "authorized", "success"] },
    }).sort({ createdAt: -1 });
    const userIdToMembership = new Map();
    for (const p of payments) {
      if (!userIdToMembership.has(String(p.userId))) {
        userIdToMembership.set(String(p.userId), p.notes?.membershipType || null);
      }
    }
    const usersWithMembership = allUsers.map((u) => {
      const obj = u.toObject ? u.toObject() : u;
      return {
        ...obj,
        membershipType: userIdToMembership.get(String(u._id)) || null,
      };
    });

    res.status(200).json({
      message: "Your possible matches.",
      data: usersWithMembership,
    });
  } catch (error) {
    res.status(400).json({ message: `Some Error Occurred: ${error.message}`, data: {} });
  }
});

module.exports = userRouter;
