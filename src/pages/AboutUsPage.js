import React, { useState } from 'react';
import Header from './Header';

const AboutUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/about-us', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          

      if (response.ok) {
        setSuccessMessage('Message sent successfully');
        // Clear the form after successful submission
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        console.error('Failed to send message');
        setErrorMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message', error);
      setErrorMessage('Error sending message. Please try again.');
    }
  };

  return (
    <div className="about-us-page">

      {/* Navigation Bar */}
      <Header/>
      
      {/* Mission Section */}
      <div className="mission-section">
        <img
          src="./net.PNG"
          alt="Mission"
          className="mission-image"
        />
        <div className="mission-overlay">
          <h1>Mission Not Major</h1>
        </div>
      </div>

      {/* Vision Section */}
      <div className="vision-section">
        <img
          src="./ww5.PNG"
          alt="Vision"
          className="vision-image"
        />
        <div className="vision-text">
          <p>
            At ALU, we envision a world where education transcends boundaries,
            where students are empowered to drive change, and where diversity is
            celebrated. Our vision is to create global leaders who make a positive
            impact on their communities and the world. 
          </p>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="contact-us-section">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="about-us-form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="about-us-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="about-us-form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleInputChange} required></textarea>
          </div>
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2023 Alumni Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUsPage;
