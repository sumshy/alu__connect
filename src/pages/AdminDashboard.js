// AdminDashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const AdminDashboard = () => {
  const [alumniFormData, setAlumniFormData] = useState({
    name: '',
    email: '',
  });

  const [adminFormData, setAdminFormData] = useState({
    name: '',
    email: '',
  });

  const handleAlumniRegistration = async (e) => {
    e.preventDefault();

    try {
      // Add the logic to register alumni
      console.log('Registering Alumni:', alumniFormData);
    } catch (error) {
      console.error('Error registering alumni:', error);
    }
  };

  const handleAdminRegistration = async (e) => {
    e.preventDefault();

    try {
      // Add the logic to register admin
      console.log('Registering Admin:', adminFormData);
    } catch (error) {
      console.error('Error registering admin:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <Header />

      <h1>Admin Dashboard</h1>

      <div className="admin-actions">
        {/* Register Alumni Card */}
        <div className="admin-card">
          <h2>Register Alumni</h2>
          <form onSubmit={handleAlumniRegistration}>
            <div className="admin-form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={alumniFormData.name}
                onChange={(e) => setAlumniFormData({ ...alumniFormData, name: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={alumniFormData.email}
                onChange={(e) => setAlumniFormData({ ...alumniFormData, email: e.target.value })}
              />
            </div>
            <button type="submit">Add Alumni</button>
          </form>
        </div>

        {/* Register Admin Card */}
        <div className="admin-card">
          <h2>Register Admin</h2>
          <form onSubmit={handleAdminRegistration}>
            <div className="admin-form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={adminFormData.name}
                onChange={(e) => setAdminFormData({ ...adminFormData, name: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={adminFormData.email}
                onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
              />
            </div>
            <button type="submit">Add Admin</button>
          </form>
        </div>

        {/* Events Card */}
        <div className="admin-card">
          <h2>Events</h2>
          <Link to="/event">View Events</Link>
        </div>
      </div>

      <footer>
        <p>&copy; 2023 Alumni Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
