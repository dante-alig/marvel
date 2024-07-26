import logo from "../images/marvel_logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Search from "./search";
import Login from "./login";

const Header = ({ display, setDisplay, token, setToken }) => {
  return (
    <>
      <header>
        <Link to="/" className="logo">
          <img src={logo} alt="logo Marvel" />
        </Link>

        <menu>
          <Search />
          <Link to="/">personnages</Link>
          <Link to="/comics">comics</Link>
          <Link
            className="menu-favoris"
            to={`/likes/${token}`}
            onClick={() => {
              if (!token) {
                setDisplay((prevDisplay) => {
                  const newDisplay = !prevDisplay;
                  document.body.style.overflow = newDisplay ? "auto" : "hidden";
                  return newDisplay;
                });
              }
            }}
          >
            Favoris
          </Link>
          <div
            className="conexion"
            onClick={() => {
              if (token) {
                setToken(null);
                Cookies.remove("token");
              } else {
                setDisplay((prevDisplay) => {
                  const newDisplay = !prevDisplay;
                  document.body.style.overflow = newDisplay ? "auto" : "hidden";
                  return newDisplay;
                });
              }
            }}
          >
            <FontAwesomeIcon className="circle-icon" icon="fa-circle-user" />{" "}
            <p>{token ? "déconnexion" : "connexion"}</p>
          </div>
        </menu>
      </header>
      <Login
        display={display}
        setDisplay={setDisplay}
        token={token}
        setToken={setToken}
      />
    </>
  );
};

export default Header;
