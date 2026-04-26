import { useRoutes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Menu from "./pages/Menu";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/play", element: <Play /> },
    { path: "/menu", element: <Menu /> },
    { path: "/events", element: <Events /> },
    { path: "/gallery", element: <Gallery /> },
    { path: "/contact", element: <Contact /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
  ]);

  return routes;
}

export default App;
