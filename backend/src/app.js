require("dotenv").config();
const express = require("express");
const { connectToCluster } = require("./config/database");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./utils/socket");

require("./utils/cronjob");

const app = express();
const server = http.createServer(app);
initializeSocket(server);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin); // Reflect the requesting origin
    },
    credentials: true,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

connectToCluster()
  .then(() => {
    server.listen(8000, () => {
      console.log("successfully listening on port 8000");
    });
  })
  .catch((err) => {
    console.log("failed with error ", err);
  });
