import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const storage = localStorage.getItem("sumaya__data");
  const [user, setUser] = useState(storage ? JSON.parse(storage)?.user : null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/events//recent");
      if (response.data) {
        console.log("recent event data from server", response.data);
        setEvents(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("UUUUUUUUUUUU", user);
    fetchEvents();
  }, []);

  return (
    <div>
      <Header user={user} />

      <main>
        <div className="alu-connect-name">
          <h1 className="alu-title">
            <span style={{ color: "blue" }}>ALU</span>{" "}
            <span style={{ color: "red" }}>Connect</span>
          </h1>
        </div>
        <section id="hero" className="hero">
          <div className="hero-msg">
            <span className="hero-title">STAY IN TOUCH WITH ALU</span>
            <p className="hero-description">
              Enjoy the events and stay connected with over 300 alumni on the
              platform across all hubs.
            </p>
            <p className="hero-description">
              Participate in events and connect with others. Networking
              opportunities with successful professionals.
            </p>
          </div>
          <div className="hero-img">
            <img src="ww5.png" alt="Alumni" className="hero-img" />
          </div>
        </section>
      </main>

      <section className="cta">
        <h2>Ready to Connect?</h2>
        <Link to="/signup" className="cta-btn">
          Get Started
        </Link>
      </section>

      <section className="upcoming-events">
        <h2>Upcoming Events</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="event-container">
            {events.map((event, i) => (
              <div className="event-box" key={i}>
                <img src="/aluimage.jpg" alt={`Event ${i + 1}`} />
                <p className="event-name">{event.title}</p>
                <p className="event-description">{event.description}</p>
                <Link to="/event" className="event-button">
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer>
        <p>&copy; 2023 Alumni Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
