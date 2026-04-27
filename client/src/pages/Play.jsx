import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Play({ api_url }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const apiBase = api_url || "";

  useEffect(() => {
    fetch(`${apiBase}/api/games`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load games");
        return res.json();
      })
      .then((data) => setGames(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [apiBase]);

  const genres = useMemo(() => [...new Set(games.map((g) => g.genre?.toLowerCase()).filter(Boolean))], [games]);

  const visibleGames = useMemo(() => {
    const filtered =
      filter === "all" ? games : games.filter((g) => g.genre?.toLowerCase() === filter);

    return [...filtered].sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "rating-desc") return b.rating - a.rating;
      if (sort === "rating-asc") return a.rating - b.rating;
      return 0;
    });
  }, [games, filter, sort]);

  const handleReset = () => {
    setFilter("all");
    setSort("default");
  };

  return (
    <>
      <Header />

      <main id="main-content">
        <section className="section-hero play-hero">
          <div className="hero-content">
            <p className="hero-tag">Pick your game and start playing.</p>
            <h1>Games</h1>
            <p className="hero-text">
              Filter and sort arcade games by category, name, or rating.
            </p>
          </div>
        </section>

        <section className="container page-section">
          <div className="games-controls">
            <h2 className="section-title">Filter and Sort Games</h2>

            <div className="games-filter-form">
              <div className="filter-group">
                <label htmlFor="game-filter">Filter by genre</label>
                <select
                  id="game-filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Games</option>
                  {genres.map((g) => (
                    <option key={g} value={g}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="game-sort">Sort by</label>
                <select
                  id="game-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="default">Featured</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="rating-asc">Lowest Rated</option>
                </select>
              </div>

              <button type="button" className="filter-reset" onClick={handleReset}>
                Reset
              </button>
            </div>

            {!loading && !error && (
              <p className="filter-results" aria-live="polite">
                {visibleGames.length} game{visibleGames.length === 1 ? "" : "s"} found
              </p>
            )}
          </div>
        </section>

        <section className="container page-section games-section">
          <h2 className="section-title">Game Lineup</h2>

          {loading && <p className="fetch-status">Loading games...</p>}
          {error && <p className="fetch-error">{error}</p>}

          {!loading && !error && (
            <div className="games-grid">
              {visibleGames.map((game) => (
                <Link
                  to={`/games/${game.id}`}
                  className="game-card"
                  key={game.id}
                  data-category={game.genre?.toLowerCase()}
                  data-rating={game.rating}
                  style={{ textDecoration: "none" }}
                >
                  {game.image_url && (
                    <img src={game.image_url} alt={game.name} className="game-card-img" />
                  )}
                  <div className="game-card-body">
                    <h3 className="game-card-name">{game.name}</h3>
                    <span className="game-card-genre">{game.genre}</span>
                    {game.description && (
                      <p className="game-card-desc">{game.description}</p>
                    )}
                    <div className="game-card-meta">
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
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Play;
