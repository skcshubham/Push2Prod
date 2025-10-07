const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

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
