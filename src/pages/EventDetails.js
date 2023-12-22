import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header"; 

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `https://alu-connect-api.onrender.com/events/${eventId}`
        );
        setEvent(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  
  const data = JSON.parse(localStorage.getItem("sumaya__data"));
  const handleAttend = async () => {
    try {
      
      await axios.post(`https://alu-connect-api.onrender.com/events/${eventId}/attend`, {
        userId: data?.user._id,
      });

      
      window.alert("Attendance recorded successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
        {!event?.attendees?.includes(data?.user?._id) && (
          <button onClick={handleAttend} className="attend-button">
            Attend
          </button>
        )}
      </div>
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2023 Alumni Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EventDetails;
