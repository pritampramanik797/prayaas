import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";
import Profile from "./components/profile";
import HeroPage from "./components/heroPage"; // New HeroPage component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <Routes>
            <Route path="/" element={<HeroPage user={user} />} /> {/* HeroPage is the default route */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} /> {/* Redirect to login if not authenticated */}
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </Router>
  );
}

export default App;
