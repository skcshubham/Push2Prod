const mongoose = require("mongoose");

const connectToCluster = async () => {
  await mongoose.connect(
    "mongodb+srv://mazakomaviya:shubhamkr@namastenode.g2p4enn.mongodb.net/devTinder"
  );
};

module.exports = {
  connectToCluster,
};
