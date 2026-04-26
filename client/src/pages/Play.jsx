import { useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ALL_GAMES = [
  { name: "Pac-Man", category: "classic", rating: 5 },
  { name: "Street Fighter", category: "fighting", rating: 4 },
  { name: "Pinball", category: "classic", rating: 5 },
  { name: "Mortal Kombat", category: "fighting", rating: 5 },
  { name: "Galaga", category: "classic", rating: 4 },
  { name: "Air Hockey", category: "sports", rating: 4 },
];

function Play() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  const visibleGames = useMemo(() => {
    const filtered =
      filter === "all" ? ALL_GAMES : ALL_GAMES.filter((g) => g.category === filter);

    return [...filtered].sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "rating-desc") return b.rating - a.rating;
      if (sort === "rating-asc") return a.rating - b.rating;
      return 0;
    });
  }, [filter, sort]);

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
                <label htmlFor="game-filter">Filter by category</label>
                <select
                  id="game-filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Games</option>
                  <option value="classic">Classic</option>
                  <option value="fighting">Fighting</option>
                  <option value="sports">Sports</option>
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

            <p className="filter-results" aria-live="polite">
              {visibleGames.length} game{visibleGames.length === 1 ? "" : "s"} found
            </p>
          </div>
        </section>

        <section className="container page-section games-section">
          <h2 className="section-title">Game Lineup</h2>
          <div className="games-grid">
            {visibleGames.map((game) => (
              <div
                className="game-card"
                key={game.name}
                data-category={game.category}
                data-name={game.name}
                data-rating={game.rating}
              >
                {game.name}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Play;
