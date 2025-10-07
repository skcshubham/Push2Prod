const express = require("express");
const { connectToCluster } = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectToCluster()
  .then(() => {
    app.listen(8000, () => {
      console.log("successfully listening on port 8000");
    });
  })
  .catch((err) => {
    console.log("failed with error ", err);
  });
