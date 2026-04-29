import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


function Leaderboard({ api_url }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiBase = api_url || "";

  useEffect(() => {
    fetch(`${apiBase}/api/scores`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load scores");
        return res.json();
      })
      .then((data) => setScores(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [apiBase]);

  const gameGroups = useMemo(() => {
    const groups = {};
    for (const score of scores) {
      if (!groups[score.game_name]) groups[score.game_name] = [];
      groups[score.game_name].push(score);
    }
    for (const game in groups) {
      groups[game].sort((a, b) => b.score - a.score);
      groups[game] = groups[game].slice(0, 10); // Top 10 per game
    }
    return groups;
  }, [scores]);

  // Helper to get rank styling class
  const getRankClass = (index) => {
    if (index === 0) return "rank-gold";
    if (index === 1) return "rank-silver";
    if (index === 2) return "rank-bronze";
    return "";
  };

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="leaderboard-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="badge">Global Rankings</span>
            <h1>Hall of Fame</h1>
            <p>Compete against players worldwide and claim your spot at the top.</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="container page-section">
          
          {/* Loading State with Skeleton */}
          {loading && (
            <div className="skeleton-container">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-game-panel">
                  <div className="skeleton-header"></div>
                  <div className="skeleton-row"></div>
                  <div className="skeleton-row"></div>
                  <div className="skeleton-row"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-box">
              <h3>Oops!</h3>
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className="btn-secondary">Try Again</button>
            </div>
          )}


          {/* Empty State */}
          {!loading && !error && Object.keys(gameGroups).length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🕹️</div>
              <h3>No scores yet</h3>
              <p>Be the first to set a high score!</p>
              <Link to="/play" className="btn btn-primary">Start Playing</Link>
            </div>
          )}


          {/* Leaderboard Grid */}
          {!loading && !error && Object.keys(gameGroups).length > 0 && (
            <div className="games-grid">
                
              {Object.entries(gameGroups).map(([gameName, gameScores]) => (
                
                <div key={gameName} className="game-panel">
                  <div className="panel-header">
                    <h3>{gameName}

                        
                    </h3>
                    
                    <span className="total-scores">{gameScores.length} Entries</span>
                  </div>
                  
                  <div className="score-list">
                    <div className="score-row header-row">
                      <span className="col-rank">Rank</span>
                      <span className="col-player">Player</span>
                      <span className="col-score">Score</span>
                      <span className="col-date">Date</span>
                    </div>
                    
                    {gameScores.map((score, index) => (
                      <div key={score.id} className={`score-row ${getRankClass(index)}`}>
                        <span className="col-rank">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                        </span>
                        <span className="col-player">{score.player_name}</span>
                        <span className="col-score">{score.score.toLocaleString()}  </span>
                        <span className="col-date">{new Date(score.created_at).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="cta-container">
            <Link to="/play" className="btn btn-lg btn-glow">Play Now & Submit Score</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Leaderboard;
