import React, { useState } from "react";

function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    organizer: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Event created successfully, you can handle the response here
        console.log("Event created successfully!");
      } else {
        // Handle the error
        console.error("Failed to create event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Create an Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
        />
        {/* Add other input fields for description, date, location, category, organizer */}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventForm;
