import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import { useNavigate } from 'react-router-dom';
import "./Signup.css";
import {FireBaseContext} from "../../Store/FirebaseContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";


export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { Firebase } = useContext(FireBaseContext);
  const firestore = getFirestore(Firebase);


  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
        
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(result) => {
        const userCollection = collection(firestore, 'users');
        await setDoc(doc( userCollection), {
            userDisplay:username,
            email,
            phone
          });
        navigate('/login');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  };


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=""></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
