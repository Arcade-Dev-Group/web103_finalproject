import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SPECIALS = [
  { name: "Tuesday Burger Deal", price: "$9" },
  { name: "Wednesday Wing Night", price: "$12" },
  { name: "Friday Happy Hour", price: "2 for 1" },
  { name: "Saturday Game Night Combo", price: "$18" },
  { name: "Sunday Family Bundle", price: "$24" },
];

function Menu({ api_url }) {
  const [food, setFood] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBase = api_url || "";

  useEffect(() => {
    fetch(`${apiBase}/api/menu`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load menu");
        return res.json();
      })
      .then((data) => {
        setFood(data.food);
        setDrinks(data.drinks);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [apiBase]);

  const menuSections = [
    {
      title: "Food",
      image: "/img/burger.jpg",
      alt: "Burger with fries",
      items: food.map((item) => ({
        name: item.name,
        price: `$${parseFloat(item.price).toFixed(2)}`,
        description: item.description,
      })),
    },
    {
      title: "Drinks",
      image: "/img/drinks.jpg",
      alt: "Cold drinks in cans",
      items: drinks.map((item) => ({
        name: item.name,
        price: `$${parseFloat(item.price).toFixed(2)}`,
        description: item.description,
        badge: item.is_alcoholic ? "21+" : null,
      })),
    },
    {
      title: "Specials",
      image: "/img/pizza.jpg",
      alt: "Pizza",
      items: SPECIALS,
    },
  ];

  return (
    <>
      <Header />

      <main id="main-content">
        <section className="section-hero menu-hero">
          <div className="hero-content">
            <p className="hero-tag">Good food. Cold drinks. Great vibes.</p>
            <h1>Menu</h1>
            <p className="hero-text">
              Pick your favorites from our food, drinks, and specials.
            </p>
          </div>
        </section>

        <section className="container page-section">
          {loading && <p className="fetch-status">Loading menu...</p>}
          {error && <p className="fetch-error">{error}</p>}

          {!loading && !error && (
            <div className="menu-grid">
              {menuSections.map((section) => (
                <div className="menu-card" key={section.title}>
                  <img
                    src={section.image}
                    alt={section.alt}
                    className="menu-image"
                  />
                  <h2>{section.title}</h2>
                  {section.items.map((item) => (
                    <div className="menu-item" key={item.name}>
                      <div>
                        <p>{item.name}</p>
                        {item.description && (
                          <p className="menu-item-desc">{item.description}</p>
                        )}
                      </div>
                      <div className="menu-item-right">
                        {item.badge && (
                          <span className="menu-badge">{item.badge}</span>
                        )}
                        <span>{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Menu;
