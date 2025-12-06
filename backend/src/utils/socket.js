const socket = require("socket.io");
const { Chat } = require("../models/chat");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ currentUserId, targetUserId }) => {
      const roomId = [currentUserId, targetUserId].sort().join("_");
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ currentUserId, targetUserId, message }) => {
        const roomId = [currentUserId, targetUserId].sort().join("_");
        // save message to database

        try {
          // get chat from database
          const chat = await Chat.findOne({
            participants: { $all: [currentUserId, targetUserId] },
          });

          // if chat is not there create a new chat
          if (!chat) {
            chat = new Chat({
              participants: [currentUserId, targetUserId],
              messages: [],
            });
          }
          // appending current message
          chat.messages.push({
            senderId: currentUserId,
            text: message,
          });

          await chat.save();

          io.to(roomId).emit("receiveMessage", {
            currentUserId,
            targetUserId,
            message,
          });
        } catch (error) {
          console.log(`Error Occured ${error}`);
        }
      }
    );

    socket.on("disconnect", () => {
      //
    });
  });
};

module.exports = initializeSocket;
