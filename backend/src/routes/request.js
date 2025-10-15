const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

/**
 * @swagger
 * /request/send/{status}/{toUserId}:
 *   post:
 *     summary: Send a connection request to another user
 *     tags: [Requests]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [ignored, interested]
 *         description: The status of the connection request
 *       - in: path
 *         name: toUserId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to send request to
 *     responses:
 *       200:
 *         description: Connection request sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid request or connection already exists
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
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      throw new Error(`Invalid status ${status}`);
    }

    // check if there is existing connectionRequest
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      throw new Error(`Connection Request Already Exists.`);
    }

    const toUser = await User.findById(toUserId);

    if (!toUser) {
      throw new Error(`User not found.`);
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const connectionRequestData = await connectionRequest.save();

    res.json({
      message: `Connection Status : ${status}`,
      data: connectionRequestData,
    });
  } catch (error) {
    res.status(400).json({ message: `Some Error Occurred: ${error.message}`, data: {} });
  }
});

/**
 * @swagger
 * /request/review/{status}/{requestId}:
 *   post:
 *     summary: Review a received connection request
 *     tags: [Requests]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [accepted, rejected]
 *         description: Accept or reject the request
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the connection request
 *     responses:
 *       200:
 *         description: Connection request reviewed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid request or request not found
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
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    // logged in user is toUserId (receiever needs to accept the request)
    // status can be accepted or rejected here and can happen when connectionRequest is interested. (right swiped)

    const loggedInUserId = req.user._id;
    const requestId = req.params.requestId;
    const status = req.params.status;

    // check if status is valid
    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid status.");
    }

    // filter connection Requests which is interested for the logged in user
    // basically how many requests that users have right swiped for current user.
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId, // valid requestId
      toUserId: loggedInUserId,
      status: "interested",
    });

    // no connection request
    if (!connectionRequest) {
      res.json({
        message: `No Connection Request found.`,
        data: {},
      });
    }

    // else change status to interested or rejected
    connectionRequest.status = status;
    const modifiedConnectionRequest = await connectionRequest.save();

    res.json({
      message: `Connection Request ${status}.`,
      data: modifiedConnectionRequest,
    });
  } catch (error) {
    res.status(400).json({ message: `Some Error Occurred: ${error.message}`, data: {} });
  }
});

module.exports = requestRouter;
