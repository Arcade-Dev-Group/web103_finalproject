import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login form submitted. Connect this to your backend later.");
  };

  return (
    <>
      <Header />

      <main id="main-content">
        <section className="section-hero login-hero">
          <div className="hero-content">
            <p className="hero-tag">Welcome back, player.</p>
            <h1>Login</h1>
            <p className="hero-text">
              Sign in to see events, specials, and VIP updates.
            </p>
          </div>
        </section>

        <section className="container page-section">
          <div className="login-card">
            <h2>Member Login</h2>

            <form className="login-form" onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="login-submit">
                Login
              </button>
            </form>

            <p className="login-text">
              Don&apos;t have an account?{" "}
              <Link to="/signup">Sign up here</Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Login;
