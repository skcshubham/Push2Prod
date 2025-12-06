import { io } from "socket.io-client";
import { API_BASE_URL } from "../services/api";

export const createSocketConnection = () => {
  return io(API_BASE_URL, {
    autoConnect: true,
  });
};
