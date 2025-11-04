const mongoose = require("mongoose");

const connectToCluster = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
};

module.exports = {
  connectToCluster,
};
