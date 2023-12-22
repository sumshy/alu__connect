// SignUpPage.js
import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'alumni', // Default role is alumni
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://alu-connect-api.onrender.com/auth/signup', formData);
      console.log(response.data);
      if(response.data){
        navigate("/signin")
      }

      // Handle the response, redirect, or perform additional actions
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="sign-up-page">
      <Header />

      <div className="sign-up-container">
        <div className="custom-sign-up-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSignUp}>
            {/* Sign Up form fields */}
            <div className="custom-form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="custom-form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="custom-form-group">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </div>
            {/* Add role selection */}
            <div className="custom-form-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleInputChange}>
                <option value="alumni">Alumni</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="sign-up-button">
              Sign Up
            </button>
          </form>
          
          <p>
          Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
        <div className="sign-up-image">
          <img src="signup.png" alt="Sign Up Image" />
        </div>
      </div>

      <div className="terms-of-use">
        <p>
          By signing up, you agree with the <a href="#">Terms of Use & Privacy Policy</a>
        </p>
      </div>

      <footer>
        <p>&copy; 2023 Alumni Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignUpPage;
