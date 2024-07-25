import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";
import Home from "./pages/home";
import Header from "./components/header";
import Character from "./pages/character";
import Comics from "./pages/comics";
import Likes from "./pages/likes";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
library.add(faStar, faCircleUser, faMagnifyingGlass);

function App() {
  const [display, setDisplay] = useState(true);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [token, setToken] = useState(Cookies.get("token") || "");
  return (
    <Router>
      <Header
        display={display}
        setDisplay={setDisplay}
        token={token}
        setToken={setToken}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home setName={setName} setImage={setImage} setLink={setLink} />
          }
        />
        <Route
          path="/character/:characterId"
          element={
            <Character
              name={name}
              setName={setName}
              image={image}
              setImage={setImage}
              link={link}
              setLink={setLink}
              token={token}
            />
          }
        />
        <Route path="/comics" element={<Comics />} />
        <Route path="/likes" element={<Likes token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
