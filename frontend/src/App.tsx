import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AuthInitializer from "./components/AuthInitializer";
import Chats from "./routes/Chats";
import Feed from "./routes/Feed";
import LandingPage from "./routes/LandingPage";
import Profile from "./routes/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Requests from "./routes/Requests";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import { Toaster } from "@chakra-ui/react";
import { toaster } from "./components/ui/toaster";

function App() {
  return (
    <AuthInitializer>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster toaster={toaster}>{(toast) => <div>{toast.title}</div>}</Toaster>
      </Router>
    </AuthInitializer>
  );
}

export default App;
