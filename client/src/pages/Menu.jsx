import Header from "../components/Header";
import Footer from "../components/Footer";

const menuSections = [
  {
    title: "Food",
    image: "/img/burger.jpg",
    alt: "Burger with fries",
    items: [
      { name: "Loaded Fries", price: "$8" },
      { name: "Cheeseburger", price: "$12" },
      { name: "Chicken Wings", price: "$14" },
      { name: "Nachos", price: "$10" },
      { name: "Mozzarella Sticks", price: "$9" },
    ],
  },
  {
    title: "Drinks",
    image: "/img/drinks.jpg",
    alt: "Cold drinks in cans",
    items: [
      { name: "House Beer", price: "$6" },
      { name: "Craft Beer", price: "$7" },
      { name: "Classic Margarita", price: "$11" },
      { name: "Arcade Punch", price: "$10" },
      { name: "Soda", price: "$3" },
    ],
  },
  {
    title: "Specials",
    image: "/img/pizza.jpg",
    alt: "Pizza",
    items: [
      { name: "Tuesday Burger Deal", price: "$9" },
      { name: "Wednesday Wing Night", price: "$12" },
      { name: "Friday Happy Hour", price: "2 for 1" },
      { name: "Saturday Game Night Combo", price: "$18" },
      { name: "Sunday Family Bundle", price: "$24" },
    ],
  },
];

function Menu() {
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
                    <p>{item.name}</p>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Menu;
