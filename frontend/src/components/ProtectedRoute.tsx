import { Navigate } from "react-router-dom";
import type { User } from "../types/user.types";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated
  );
  const loggedInUser = useSelector((state: { auth: { user: User | null } }) => state.auth.user);

  const isLoggedIn = isAuthenticated || !!loggedInUser;

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
