import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />

      <main id="main-content">
        <section className="section-hero">
          <div className="hero-content">
            <p className="hero-tag">Neon nights. Classic games. Cold drinks.</p>
            <h1>Arcade Bar</h1>
            <p className="hero-text">
              A fun place to play games, grab drinks, and hang out with friends.
            </p>
          </div>
        </section>

        <section className="section-feature container grid-2">
          <div
            className="feature-img"
            role="img"
            aria-label="Arcade games and neon lighting"
          ></div>
          <div className="feature-text">
            <h2>Play Classic Games</h2>
            <p>
              Jump into retro arcade machines, pinball, and modern games all in
              one place.
            </p>
          </div>
        </section>

        <section className="section-about container">
          <h2>About Us</h2>
          <p>
            Arcade Bar is your spot for games, drinks, and a good time with
            friends.
          </p>
        </section>

        <section className="section-grid container">
          <div className="grid-2 content-grid">
            <div className="text-box">
              <p>Grab drinks and snacks while you play.</p>
            </div>
            <div
              className="img-box"
              role="img"
              aria-label="Food and drinks at the arcade bar"
            ></div>

            <div
              className="img-box-2"
              role="img"
              aria-label="Players competing in arcade games"
            ></div>
            <div className="text-box">
              <p>Challenge your friends and beat high scores.</p>
            </div>

            <div className="text-box">
              <p>Join tournaments, themed nights, and special events.</p>
            </div>
            <div
              className="img-box-3"
              role="img"
              aria-label="Arcade event with bright lights"
            ></div>
          </div>
        </section>

        <section className="section-signup">
          <div className="signup-box">
            <p className="section-label">Stay Updated</p>
            <h2>Join the VIP List</h2>
            <p>Get event updates, specials, and new game news.</p>
          </div>
        </section>

        <section className="section-events">
          <div className="events-box">
            <p className="section-label">This Week</p>
            <h2>Upcoming Events & Specials</h2>
            <p>Check out game nights, drink deals, and weekend tournaments.</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
