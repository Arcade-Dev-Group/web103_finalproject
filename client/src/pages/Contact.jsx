import Header from "../components/Header";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <Header />

      <main id="main-content">
        <section className="section-hero contact-hero">
          <div className="hero-content">
            <p className="hero-tag">Come hang out with us.</p>
            <h1>Contact</h1>
            <p className="hero-text">
              Reach out for questions, bookings, or event info.
            </p>
          </div>
        </section>

        <section className="container page-section">
          <div className="menu-grid">
            <div className="menu-card">
              <h2>Get In Touch</h2>
              <p>
                Email:{" "}
                <a href="mailto:hello@arcadebar.com">hello@arcadebar.com</a>
              </p>
              <p>
                Phone: <a href="tel:15551234567">(555) 123-4567</a>
              </p>
            </div>

            <div className="menu-card">
              <h2>Visit Us</h2>
              <p>123 Neon Ave</p>
              <p>Neon District, FL</p>
            </div>

            <div class="menu-card">
            <h2>Hours</h2>
            <div class="hours-list">
              <div class="hours-item">
                <span>Mon - Thu</span>
                <span>3PM - 12AM</span>
              </div>
              <div class="hours-item">
                <span>Fri</span>
                <span>3PM - 2AM</span>
              </div>
              <div class="hours-item">
                <span>Sat</span>
                <span>11AM - 2AM</span>
              </div>
              <div class="hours-item">
                <span>Sun</span>
                <span>11AM - 12AM</span>
              </div>
            </div>
          </div>
            
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Contact;
