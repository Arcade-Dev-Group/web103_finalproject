import { NavLink, Link } from "react-router-dom";

function Header() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="header">
        <Link className="logo" to="/">
          Arcade Bar
        </Link>

        <nav aria-label="Main navigation">
          <ul className="nav">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/play">Play</NavLink>
            </li>
            <li>
              <NavLink to="/menu">Menu</NavLink>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
<li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard">Leaderboard</NavLink>
            </li>
          </ul>
        </nav>

        <div className="auth-buttons">
          <Link className="login-btn" to="/login">
            Login
          </Link>
          <Link className="login-btn" to="/signup">
            Sign Up
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
