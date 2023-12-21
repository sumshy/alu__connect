import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; // Import your Header component

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

// EventDetails.js (or similar)
const handleAttend = async () => {
  try {
    // Make a request to your backend to handle the attendance logic
    await axios.post(`http://localhost:3000/events/${eventId}/attend`);
    // Optionally, you can show a confirmation message or update the UI
    console.log("Attendance recorded and email sent");
  } catch (error) {
    console.log(error);
  }
};


  if (!event) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="event-details-page">
      <Header /> {/* Include the navigation bar */}
      <h1>Event Details</h1>
      <div className="event-details">
        <img src={event.imageUrl} alt={`Event ${eventId}`} />
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p>Date: {event.date}</p>
        <p>Location: {event.location}</p>
        <p>Category: {event.category}</p>
        <p>Organizer: {event.organizer}</p>
        
        {/* Attend button */}
        <button onClick={handleAttend} className="attend-button">
          Attend
        </button>
      </div>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2023 Alumni Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EventDetails;
