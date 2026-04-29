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
              A fun place to play classic and modern games, enjoy drinks, and spend time with friends in a lively arcade atmosphere.
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
              Jump into retro arcade machines, pinball, and modern games all in one place. Whether you enjoy classic favorites or newer challenges, there is something for everyone.
            </p>
          </div>
        </section>

        <section className="section-about container">
          <h2>About Us</h2>
          <p>
            Arcade Bar is your go-to spot for games, drinks, and a good time with friends. Our goal is to create a fun and welcoming space where people can relax, compete, and enjoy a unique arcade experience.
          </p>
          <p>We offer a mix of classic arcade machines, pinball, and modern games so there is something for everyone. Whether you are visiting for the nostalgia of retro games or looking to try something new, Arcade Bar provides a variety of options to keep you entertained.</p>
          <p>In addition to games, we serve drinks and snacks that make it easy to stay and enjoy your time. The atmosphere is designed to be energetic and social, making it a great place for groups, casual nights out, or special events.</p>
          <p>At Arcade Bar, we focus on bringing people together through games, friendly competition, and shared experiences. Our goal is to create a place where every visit feels fun, engaging, and memorable.</p>
        </section>

        <section className="section-grid container">
          <div className="grid-2 content-grid">
            <div className="text-box">
              <p>Grab drinks and snacks while you play, so you can stay energized and enjoy your time without missing the action.</p>
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
              <p>Challenge your friends, compete for high scores, and see who comes out on top.</p>
            </div>

            <div className="text-box">
              <p>Join tournaments, themed nights, and special events that bring excitement and competition to every visit.</p>
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
            <p>Get updates on events, special deals, and new games so you never miss out on what’s happening.</p>
          </div>
        </section>

        <section className="section-events">
          <div className="events-box">
            <p className="section-label">This Week</p>
            <h2>Upcoming Events & Specials</h2>
            <p>Check out game nights, drink deals, and tournaments happening throughout the week.</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
