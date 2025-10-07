const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // read token
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid Token");
    }

    // validate token
    const decodedMessage = await jwt.verify(token, "Shubhamkr@26");
    const { _id } = decodedMessage;

    // find user exists with the token
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User does not exist.");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(`Some Error Occured ${error}`);
  }
};

module.exports = { userAuth };
