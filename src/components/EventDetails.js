// src/components/EventDetails.js
import React from "react";

const EventDetails = ({ event }) => {
  return (
    <div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
    </div>
  );
};

export default EventDetails;
