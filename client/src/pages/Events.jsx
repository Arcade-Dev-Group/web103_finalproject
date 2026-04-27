import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const EVENT_IMAGES = [
  "https://images.unsplash.com/photo-1606595894604-ddc3fa2fabef?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1536818968680-deeec2e9fd11?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1629522244807-aaf9b811339d?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1532498295735-1a94911c162c?w=600&auto=format&fit=crop&q=60",
];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function formatTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":");
  const date = new Date();
  date.setHours(parseInt(h, 10), parseInt(m, 10));
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function RegisterModal({ event, onClose, onSuccess, apiBase }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${apiBase}/api/events/${event.id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Registration failed.");
        setStatus("error");
      } else {
        setStatus("success");
        onSuccess(event.id);
      }
    } catch {
      setMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {status === "success" ? (
          <div className="modal-success">
            <p className="modal-success-icon">🎮</p>
            <h2>You're registered!</h2>
            <p>See you at <strong>{event.title}</strong>.</p>
            <button className="register-btn" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2>Register for {event.title}</h2>
            <p className="modal-date">{formatDate(event.event_date)}</p>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="reg-name">Name</label>
                <input
                  id="reg-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-email">Email</label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>

              {status === "error" && (
                <p className="register-error">{message}</p>
              )}

              <button
                type="submit"
                className="register-btn"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Registering..." : "Reserve My Spot"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Events({ api_url }) {
  const [events, setEvents] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const apiBase = api_url || "";

  useEffect(() => {
    fetch(`${apiBase}/api/events`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        return Promise.all(
          data.map((e) =>
            fetch(`${apiBase}/api/events/${e.id}/registrations/count`)
              .then((r) => r.json())
              .then((c) => ({ id: e.id, count: c.count }))
          )
        );
      })
      .then((results) => {
        const map = {};
        results.forEach(({ id, count }) => { map[id] = count; });
        setCounts(map);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleRegistrationSuccess = (eventId) => {
    setCounts((prev) => ({ ...prev, [eventId]: (prev[eventId] ?? 0) + 1 }));
  };

  return (
    <>
      <Header />

      <main id="main-content">
        <section className="section-hero events-hero">
          <div className="hero-content">
            <p className="hero-tag">Weekly fun and special nights.</p>
            <h1>Events</h1>
            <p className="hero-text">
              Game nights, drink deals, and weekend tournaments.
            </p>
          </div>
        </section>

        <section className="container page-section">
          <h2 className="section-title">What's Happening</h2>

          {loading && <p className="fetch-status">Loading events...</p>}
          {error && <p className="fetch-error">{error}</p>}

          {!loading && !error && (
            <div className="events-grid">
              {events.map((event, i) => (
                <div className="event-card" key={event.id}>
                  <img
                    src={EVENT_IMAGES[i % EVENT_IMAGES.length]}
                    alt={event.title}
                    className="event-image"
                  />
                  <h3>{event.title}</h3>
                  <p className="event-date">{formatDate(event.event_date)}</p>
                  {event.start_time && (
                    <p className="event-time">
                      {formatTime(event.start_time)}
                      {event.end_time ? ` – ${formatTime(event.end_time)}` : ""}
                    </p>
                  )}
                  <p>{event.description}</p>
                  <div className="event-count">
                    <span className="event-count-number">{counts[event.id] ?? 0}</span>
                    <span className="event-count-label">
                      {counts[event.id] === 1 ? "person" : "people"}<br />registered
                    </span>
                  </div>
                  <button
                    className="register-btn"
                    onClick={() => setSelectedEvent(event)}
                  >
                    Register
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="container page-section">
          <div className="menu-card">
            <h2>Special Nights</h2>
            <p>Live DJs, themed parties, and prize giveaways all month long.</p>
          </div>
        </section>
      </main>

      <Footer />

      {selectedEvent && (
        <RegisterModal
          event={selectedEvent}
          apiBase={apiBase}
          onClose={() => setSelectedEvent(null)}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </>
  );
}

export default Events;
