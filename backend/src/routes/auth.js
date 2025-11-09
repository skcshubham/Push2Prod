const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const { welcomeMessage } = require("../utils/constant");

const authRouter = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User added successfully.
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid input or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error Occured [error message]
 *                 data:
 *                   type: object
 */
authRouter.post("/signup", async (req, res) => {
  try {
    // validate signup data
    validateSignUpData(req.body);

    // encrypt password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // creating instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.json({ message: "User added successfully.", data: user });
  } catch (error) {
    res.status(400).json({ message: `Error Occured ${error}`, data: {} });
  }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Login Successful.
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Some Error Occured [error message]
 *                 data:
 *                   type: object
 */
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Email Id is not present.");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // create a JWT Token (schema method on User model)
      const token = await user.getJWT();

      // add token to cookie and send the response back to frontend
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Requires HTTPS
        sameSite: "none", // Required for cross-site requests
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });
      await sendEmail.run(emailId, welcomeMessage);
      res.json({ message: "User Login Successful.", data: user });
    } else {
      throw new Error("Password is not correct.");
    }
  } catch (error) {
    res.status(400).json({ message: `Some Error Occured ${error}`, data: {} });
  }
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout from user account
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout Successful.
 *                 data:
 *                   type: object
 *       400:
 *         description: Logout failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error Occured while logging out.
 *                 data:
 *                   type: object
 */
authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true, // Requires HTTPS
      sameSite: "none", // Must match login cookie settings
      expires: new Date(Date.now()),
    });
    res.status(200).json({ message: "Logout Successful.", data: {} });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error Occured while logging out.", data: {} });
  }
});

module.exports = authRouter;
