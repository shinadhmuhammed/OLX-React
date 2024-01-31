import React, { useEffect, useContext } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./Store/FirebaseContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from '././Store/ViewPostContext';



function App() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
      }
    });
  });

  return (
    <>
      <Post>
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
          <Routes>
            <Route path="create" element={<Create />} />
          </Routes>
          <Routes>
            <Route path="view" element={<View />} />
          </Routes>
        </Router>
      </Post>
    </>
  );
}

export default App;
