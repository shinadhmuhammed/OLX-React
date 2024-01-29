import React, { useEffect, useContext } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./Store/FirebaseContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
      }
    });
  });

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="signup" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
