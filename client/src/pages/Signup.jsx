import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    alert("Sign up form submitted. Connect this to your backend later.");
  };

  return (
    <>
      <Header />

      <main id="main-content">
        <section className="section-hero signup-hero">
          <div className="hero-content">
            <p className="hero-tag">Join the arcade crew.</p>
            <h1>Sign Up</h1>
            <p className="hero-text">
              Create an account for updates, specials, and events.
            </p>
          </div>
        </section>

        <section className="container page-section">
          <div className="signup-card">
            <h2>Create Account</h2>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="signup-submit">
                Sign Up
              </button>
            </form>

            <p className="signup-text">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Signup;
