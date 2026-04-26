import Header from "../components/Header";
import Footer from "../components/Footer";

const galleryItems = [
  "Neon Room",
  "Pinball Area",
  "Bar Area",
  "Game Wall",
  "Event Night",
  "Arcade Floor",
];

function Gallery() {
  return (
    <>
      <Header />

      <main id="main-content">
        <section className="section-hero gallery-hero">
          <div className="hero-content">
            <p className="hero-tag">A look around the arcade.</p>
            <h1>Gallery</h1>
            <p className="hero-text">
              Bright lights, busy rooms, and good energy.
            </p>
          </div>
        </section>

        <section className="container page-section">
          <div className="games-grid">
            {galleryItems.map((label) => (
              <div className="game-card" key={label}>
                {label}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Gallery;
