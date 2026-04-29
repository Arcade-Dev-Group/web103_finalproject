import { useEffect, useState,} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {

  const [currentIndex, setCurrentIndex] = useState(0);
  // const carouselRef = useRef(null);
  const totalSlides = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const trackStyle = {
    transform: `translateX(-${currentIndex * 100}%)`,
    transition: "transform 0.4s ease"
  };

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
          />
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
          <p>We offer a mix of classic arcade machines, pinball, and modern games so there is something for everyone. Whether you are visiting for the nostalgia of retro games or looking to try something new, Arcade Bar provides a variety of options to keep you entertained.</p><br/>
          <p>In addition to games, we serve drinks and snacks that make it easy to stay and enjoy your time. The atmosphere is designed to be energetic and social, making it a great place for groups, casual nights out, or special events.</p><br/>
          <p>At Arcade Bar, we focus on bringing people together through games, friendly competition, and shared experiences. Our goal is to create a place where every visit feels fun, engaging, and memorable.</p><br/>
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
            />

            <div
              className="img-box-2"
              role="img"
              aria-label="Players competing in arcade games"
            />
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
            />
          </div>
        </section>

        <section className="section-signup">
          <div className="signup-box">
            <p className="section-label">Stay Updated</p>
            <h2>Join the VIP List</h2>
            <p>Get updates on events, special deals, and new games so you never miss out on what's happening.</p>
          </div>
        </section>

      {/* Carousel */}

        <section className="section-events">
          <div className="events-box">
            <p className="section-label">Events</p>
            <h2>Upcoming Tournaments</h2>
            <div className="events-carousel">
              <div className="carousel-track" style={trackStyle}>
                <div className="event-slide">
                  <h3>Pac-Man Marathon</h3>
                  <p>Sunday, May 10 · 6PM–10PM</p>
                  <p>Compete for highest score!</p>
                </div>
                <div className="event-slide">
                  <h3>Fighting Game Tournament</h3>
                  <p>Sunday, May 17 · 3PM–9PM</p>
                  <p>Street Fighter & MK II prizes</p>
                </div>
                <div className="event-slide">
                  <h3>Tetris Blitz Night</h3>
                  <p>Sunday, May 24 · 7PM–11PM</p>
                  <p>Speed Tetris challenge</p>
                </div>
                <div className="event-slide">
                  <h3>High Score Challenge</h3>
                  <p>Sunday, June 7 · 2PM–8PM</p>
                  <p>Beat house high scores</p>
                </div>
                <div className="event-slide">
                  <h3>Arcade Championship</h3>
                  <p>Sunday, June 21 · 4PM–10PM</p>
                  <p>Grand finals all games</p>
                </div>
              </div>
              <button 
                className="carousel-prev" 
                onClick={goPrev}
                aria-label="Previous event"
              >
                ‹
              </button>
              <button 
                className="carousel-next" 
                onClick={goNext}
                aria-label="Next event"
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
