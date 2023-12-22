import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const UpdateEventPage = () => {
  const { eventid } = useParams(); // Get the event ID from the route parameter
  const navigate = useNavigate();
  
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    organizer: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch event details based on the eventid
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://alu-connect-api.onrender.com/events/${eventid}`);
        if (response.data) {
          const eventData = response.data;
          setEventDetails({
            title: eventData.title,
            description: eventData.description,
            date: eventData.date,
            location: eventData.location,
            category: eventData.category,
            organizer: eventData.organizer,
          });
        }
      } catch (error) {
        console.log(error);
        setMessage('Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventid]);

  const handleEventDetailsChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleUpdateEventSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.put(`https://alu-connect-api.onrender.com/events/${eventid}`, eventDetails);
      if (response.data) {
        console.log('Successfully updated the event', response);
        setMessage('Event successfully updated');
      }
    } catch (error) {
      console.log(error);
      setMessage('Oops, an error occurred. Please make sure you provide all information and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-event-page">
      
      <Header/>

      <h1>Update Event</h1>

      <div className="update-event-form">
        <form onSubmit={handleUpdateEventSubmit}>
          <h2>Event Details</h2>
          {message && <div>{message}</div>}
          <div className="form-group">
            <label>Event Title</label>
            <input type="text" name="title" value={eventDetails.title} onChange={handleEventDetailsChange} />
          </div>
          <div className="form-group">
            <label>Short Description</label>
            <input type="text" name="description" value={eventDetails.description} onChange={handleEventDetailsChange} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={eventDetails.location} onChange={handleEventDetailsChange} />
          </div>
          <div className="form-group">
            <label>Event Category</label>
            <input type="text" name="category" value={eventDetails.category} onChange={handleEventDetailsChange} />
          </div>
          <div className="form-group">
            <label>Organizer</label>
            <input type="text" name="organizer" value={eventDetails.organizer} onChange={handleEventDetailsChange} />
          </div>
          <div className="form-group">
            <label>Date (mm/dd/yyyy)</label>
            <input type="date" name="date" value={eventDetails.date} onChange={handleEventDetailsChange} />
          </div>
          <button type="submit" className="update-button">{loading ? 'Please wait...' : 'UPDATE'}</button>
        </form>
      </div>

      <footer>
        <p>&copy; 2023 Alumni Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UpdateEventPage;
