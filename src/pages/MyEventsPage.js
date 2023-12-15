import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/events");
      if (response.data) {
        console.log('event data from the server', response.data);
        setEvents(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await axios.delete(`http://localhost:3000/events/${eventId}`);
        if (response.data) {
          console.log('Event deleted successfully', response);
          alert('Event successfully deleted');
          fetchEvents(); 
        }
      } catch (error) {
        console.error(error);
        alert('Failed to delete the event');
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      
      <Header/>

      <h1>My Events</h1>

      <div className="event-list">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            <img src={event?.imageUrl} alt={`Event ${event._id}`} />
            <div className="event-details">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <button className="update-button" onClick={() => navigate(`/update/${event._id}`)}>Update</button>
              <button className="delete-button" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <p>&copy; 2022 Alumni Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MyEventsPage;
