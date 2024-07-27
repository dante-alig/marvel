import logo from "../images/marvel_logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Search from "./search";
import Login from "./login";

const Header = ({
  display, // État pour afficher ou non le composant Login
  setDisplay,
  token,
  setToken,
  search,
  setSearch,
}) => {
  return (
    <>
      {/* LOGO */}
      <header>
        <Link to="/" className="logo">
          <img src={logo} alt="logo Marvel" />
        </Link>

        {/* MENU */}
        <menu>
          <Search search={search} setSearch={setSearch} token={token} />
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

          {/* LOGIN/SIGNUP */}
          <div
            className="conexion"
            onClick={() => {
              if (token) {
                // Si l'utilisateur est authentifié, déconnexion
                setToken(null);
                Cookies.remove("token"); // Suppression du cookie de token
              } else {
                // Sinon, affichage du composant Login
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

      {/* FENETRE MODAL */}
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
