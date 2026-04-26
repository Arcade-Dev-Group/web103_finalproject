const eventsData = [
  {
    title: "Trivia Night",
    description: "Every Tuesday from 7 PM to 10 PM.",
    image:
      "https://images.unsplash.com/photo-1606595894604-ddc3fa2fabef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHF1ZXN0aW9uJTIwbWFya3N8ZW58MHx8MHx8fDI%3D",
    alt: "People at trivia night",
  },
  {
    title: "Tournament Friday",
    description: "Compete for prizes and bragging rights.",
    image:
      "https://images.unsplash.com/photo-1536818968680-deeec2e9fd11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGFyY2FkZSUyMHBhcnR5fGVufDB8fDB8fHww",
    alt: "Arcade tournament with bright lights",
  },
  {
    title: "Retro Game Sunday",
    description: "Classic games, specials, and all-day fun.",
    image:
      "https://images.unsplash.com/photo-1629522244807-aaf9b811339d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGFyY2FkZSUyMHBhcnR5fGVufDB8fDB8fHww",
    alt: "Retro arcade room with neon lights",
  },
];

function Events() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="header">
        <a className="logo" href="/">
          Arcade Bar
        </a>

        <nav aria-label="Main navigation">
          <ul className="nav">
            <li><a href="/">Home</a></li>
            <li><a href="/play">Play</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/events" className="active">Events</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>

        <div className="auth-buttons">
          <a className="login-btn" href="/login">Login</a>
          <a className="login-btn" href="/signup">Sign Up</a>
        </div>
      </header>

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

          <div className="events-grid">
            {eventsData.map((event) => (
              <div className="event-card" key={event.title}>
                <img
                  src={event.image}
                  alt={event.alt}
                  className="event-image"
                />
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container page-section">
          <div className="menu-card">
            <h2>Special Nights</h2>
            <p>Live DJs, themed parties, and prize giveaways all month long.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026, The Arcade Bar</p>
      </footer>
    </>
  );
}

export default Events;