import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Chats from "./routes/Chats";
import Connections from "./routes/Connections";
import Feed from "./routes/Feed";
import LandingPage from "./routes/LandingPage";
import Profile from "./routes/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import { Toaster } from "@chakra-ui/react";
import { toaster } from "./components/ui/toaster";

function App() {
  return (
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
                <Route path="/connections" element={<Connections />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster toaster={toaster}>{(toast) => <div>{toast.title}</div>}</Toaster>
    </Router>
  );
}

export default App;
