import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import EventPage from "./pages/EventPage";
import SignUpPage from "./pages/SignUpPage";
import EventDetails from "./pages/EventDetails";
import HostEventPage from "./pages/HostEventPage";
import MyEventsPage from "./pages/MyEventsPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import SignInPage from "./pages/SignInPage";
import AdminPage from "./pages/AdminPage"; 

const mockEvents = [
  {
    _id: "1",
    title: "Event 1",
    description: "Description of Event 1",
    date: "2023-11-10",
    location: "Location 1",
  },
  {
    _id: "2",
    title: "Event 2",
    description: "Description of Event 2",
    date: "2023-11-15",
    location: "Location 2",
  },
];

function App() {
  const [events, setEvents] = React.useState(mockEvents);

  const addEvent = (newEvent) => {
    // setEvents([...events, newEvent]);
  };

  const fetchEvents = async () => {};

  return (
    <div className="App">
      {/* <EventForm onAddEvent={addEvent} />
      <EventsList events={events} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="event/:eventId" element={<EventDetails />} />
          <Route path="/hostevent/" element={<HostEventPage />} />
          <Route path="/myevents" element={<MyEventsPage />} />
          <Route path="/update/:eventid" element={<UpdateEventPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
