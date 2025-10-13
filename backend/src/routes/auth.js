const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

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
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User added successfully.
 *       400:
 *         description: Invalid input or user already exists
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error Occured [error message]
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
    res.send("User added successfully.");
  } catch (error) {
    res.status(400).send(`Error Occured ${error}`);
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
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User Login Successful.
 *       400:
 *         description: Invalid credentials
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Some Error Occured [error message]
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
      res.cookie("token", token);
      res.send("User Login Successful.");
    } else {
      throw new Error("Password is not correct.");
    }
  } catch (error) {
    res.status(400).send(`Some Error Occured ${error}`);
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
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logout Successful.
 *       400:
 *         description: Logout failed
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error Occured while logging out.
 */
authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.status(200).send(`Logout Successful.`);
  } catch (error) {
    res.status(400).send(`Error Occured while logging out.`);
  }
});

module.exports = authRouter;
