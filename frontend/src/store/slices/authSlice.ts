import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user.types";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Helper functions for localStorage persistence
const AUTH_STORAGE_KEY = 'auth_state';

const saveAuthState = (state: AuthState) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save auth state to localStorage:', error);
  }
};

const loadAuthState = (): AuthState => {
  try {
    const savedState = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Failed to load auth state from localStorage:', error);
  }
  return {
    user: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveAuthState(state);
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      saveAuthState(state);
    },
    restoreAuth: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { setUser, clearUser, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
