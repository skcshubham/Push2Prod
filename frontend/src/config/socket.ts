import { io } from "socket.io-client";
import { API_BASE_URL } from "../services/api";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(API_BASE_URL, {
      autoConnect: true,
    });
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
