import { clearUser, setUser } from "../store/slices/authSlice";
import { clearPremiumStatus } from "../store/slices/premiumSlice";

import type { User } from "../types/user.types";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetUserQuery } from "../services/api";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const dispatch = useDispatch();

  // This query will automatically run on component mount
  // It will only succeed if the user has a valid token cookie
  const { data, error } = useGetUserQuery();

  useEffect(() => {
    if (data && data.data) {
      // Token is valid, user is authenticated
      // Clear any stale premium state from a previous session
      dispatch(clearPremiumStatus());
      dispatch(setUser(data.data as User));
    } else if (error) {
      // Token is invalid or expired, clear auth state
      dispatch(clearUser());
      dispatch(clearPremiumStatus());
    }
  }, [data, error, dispatch]);

  // While we're checking authentication, show loading or return children
  // The ProtectedRoute component will handle redirecting unauthenticated users
  return <>{children}</>;
}
