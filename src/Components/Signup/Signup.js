import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import { useNavigate } from 'react-router-dom';
import "./Signup.css";
import { FireBaseContext } from "../../Store/FirebaseContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { Firebase } = useContext(FireBaseContext);
  const firestore = getFirestore(Firebase);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameError(!value.trim() ? 'Username is required' : '');
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!value.trim() ? 'Email is required' : /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format');
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneError(!value.trim() ? 'Phone is required' : '');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(!value.trim() ? 'Password is required' : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    setUsernameError(!username.trim() ? 'Username is required' : '');
    setEmailError(!email.trim() ? 'Email is required' : /\S+@\S+\.\S+/.test(email) ? '' : 'Invalid email format');
    setPhoneError(!phone.trim() ? 'Phone is required' : '');
    setPasswordError(!password.trim() ? 'Password is required' : '');


    if (usernameError || emailError || phoneError || passwordError) {
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      const userCollection = collection(firestore, 'users');
      await setDoc(doc(userCollection, result.user.uid), {
        userDisplay: username,
        email,
        phone
      });

      navigate('/login');
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
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
          {usernameError && <p className="error" style={{color:'red'}}>{usernameError}</p>}
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
          {emailError && <p className="error" style={{color:'red'}}>{emailError}</p>}
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
          {phoneError && <p className="error" style={{color:'red'}}>{phoneError}</p>}
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
          {passwordError && <p className="error" style={{color:'red'}}>{passwordError}</p>}
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
