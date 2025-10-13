import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import LandingPage from "./routes/LandingPage";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
