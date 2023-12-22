
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://alu-connect-api.onrender.com/events");
      if (response.data) {
        console.log('event data from server', response.data);
        setEvents(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleUpdate = (eventId) => {
    
    console.log(`Update event with id ${eventId}`);
  };

  const handleDelete = async (eventId) => {
    // Implement the logic for deleting an event
    try {
      await axios.delete(`https://alu-connect-api.onrender.com/events/${eventId}`);
      // Refresh the events after deletion
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="event-page">
      <Header />
      <h1>All Events</h1>
      <Link to="/hostevent" className="host-event-button">
        Host Event
      </Link>
      <div className="filter-section">
        <label>Filter by:</label>
        <label>
          <input type="checkbox" value="all" />
          All
        </label>
        <label>
          <input type="checkbox" value="professional" />
          Professional
        </label>
        <label>
          <input type="checkbox" value="networking" />
          Networking
        </label>
        <label>
          <input type="checkbox" value="campus" />
          Campus
        </label>
      </div>

      <div className="event-list-container">
        {loading ? (
          <div>LOADING EVENTS DATA...</div>
        ) : (
          <div className="event-list">
            {events.map((event) => (
              <div className="event-card" key={event._id}>
                <img src={event?.imageUrl} alt={`Event ${event.id}`} />
                <div className="event-details">
                  <h2>{event.title}</h2>
                  <p>{event.description}</p>
                  <Link to={`/event/${event._id}`} className="view-button">
                    View
                  </Link>
                  <Link to={`/update/${event._id}`} className="update-button">
                    Update
                  </Link>
                  <button onClick={() => handleDelete(event._id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="view-more-button">View More</button>

      <footer>
        <p>&copy; 2023 Alumni Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EventPage;
