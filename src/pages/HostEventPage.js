import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const HostEventPage = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    organizer: '',
    date: '',
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEventDetailsChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleHostEventSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/events', eventDetails);
      if (response.data) {
        console.log('Successfully created the event', response);
        setMessage('Event successfully created');
      }
    } catch (error) {
      console.error(error);
      setMessage('Oops, an error occurred. Please make sure you provide all information and try again.');
    } finally {
      setLoading(false);
    }

  
  };

  return (
    <div className="host-event-page">
      <div className="background-image" style={{ backgroundImage: 'url("aluimage.jpg")' }}>

        
       <Header/>

        <h1>Host an Event</h1>

        <div className="host-event-forms">
          <form onSubmit={handleHostEventSubmit} className="event-details-form">
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

            <button type="submit" className="host-button">{loading ? 'Please wait...' : 'HOST'}</button>
          </form>
        </div>

        <footer>
          <p>&copy; 2023 Alumni Connect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HostEventPage;
