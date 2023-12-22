import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header'; // Import the Header component
import axios from 'axios';

const SignInPage = () => {
  // State to manage email and password input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  // Function to handle sign-in button click
  const handleSignIn = async() => {

    try {
      const response = await axios.post("https://alu-connect-api.onrender.com/auth/signin", {email, password});

      if(response.data){
        localStorage.setItem("sumaya__data", JSON.stringify(response.data));
        navigate("/")
      }
      
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div className="sign-in-page">
      {/* Include the Header component to show the navbar */}
      <Header />

      <div className="sign-in-container">
        <div className="custom-sign-in-form">
          <h2>Sign In</h2>
          {/* Form for email and password input */}
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* Button to trigger sign-in */}
          <button type="submit" className="sign-in-button" onClick={handleSignIn}>
            Sign In
          </button>

          {/* Link to the sign-up page */}
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
