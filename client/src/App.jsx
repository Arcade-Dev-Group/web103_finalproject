import { useRoutes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Play from "./pages/Play";
import GameDetail from "./pages/GameDetail";
import Menu from "./pages/Menu";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Leaderboard from "./pages/Leaderboard";


const API_URL = import.meta.env.PROD ? 'https://server-x77u.onrender.com' : '';

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home  api_url={API_URL}/> },
    { path: "/play", element: <Play  api_url={API_URL}/> },
    { path: "/games/:id", element: <GameDetail api_url={API_URL}/> },
    { path: "/menu", element: <Menu  api_url={API_URL}/> },
    { path: "/events", element: <Events  api_url={API_URL}/> },
    { path: "/contact", element: <Contact  api_url={API_URL}/> },
    { path: "/login", element: <Login  api_url={API_URL}/> },
    { path: "/signup", element: <Signup api_url={API_URL}/> },
    { path: "/leaderboard", element: <Leaderboard api_url={API_URL}/> },
  ]);

  return routes;
}

export default App;
