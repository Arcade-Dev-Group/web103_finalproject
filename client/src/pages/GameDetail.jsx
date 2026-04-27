import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function GameDetail({ api_url }) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBase = api_url || "";

  useEffect(() => {
    fetch(`${apiBase}/api/games/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Game not found");
        return res.json();
      })
      .then((data) => setGame(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="container page-section">
          <Link to="/play" className="back-link">← Back to Games</Link>

          {loading && <p className="fetch-status">Loading game...</p>}
          {error && <p className="fetch-error">{error}</p>}

          {game && (
            <div className="game-detail">
              {game.image_url && (
                <img src={game.image_url} alt={game.name} className="game-detail-img" />
              )}
              <div className="game-detail-body">
                <span className="game-card-genre">{game.genre}</span>
                <h1 className="game-detail-name">{game.name}</h1>
                {game.description && (
                  <p className="game-detail-desc">{game.description}</p>
                )}
                <div className="game-detail-meta">
                  <a
                      href={game.play_url}
                      className="play-btn"
                      // target="_blank"
                      rel="noopener noreferrer"
                    >
                      Play Now
                    </a>
                  <span className="game-card-players">
                    {game.players === 1 ? "1 Player" : `${game.players} Players`}
                  </span>
                  <span className="game-card-rating">⭐ {game.rating}/10</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default GameDetail;
