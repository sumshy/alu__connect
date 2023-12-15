// src/components/EventList.js
import React from "react";
import EventDetails from "./EventDetails";

const EventsList = ({ events }) => {
  return (
    <div>
      <h2>Event List</h2>
      {events.map((event) => (
        <EventDetails key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
