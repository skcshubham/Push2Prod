import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user.types";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("user");
    const savedAuth = localStorage.getItem("isAuthenticated");

    if (savedUser && savedAuth === "true") {
      try {
        return {
          user: JSON.parse(savedUser),
          isAuthenticated: true,
        };
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      }
    }
  }

  return {
    user: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("isAuthenticated", "true");
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      }
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
