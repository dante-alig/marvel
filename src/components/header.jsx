import logo from "../images/marvel_logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "./search";
import Login from "./login";
const Header = ({ display, setDisplay }) => {
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
          <div>favoris</div>
          <div
            onClick={() => {
              setDisplay((prevDisplay) => {
                const newDisplay = !prevDisplay;
                document.body.style.overflow = newDisplay ? "auto" : "hidden";
                return newDisplay;
              });
            }}
          >
            <FontAwesomeIcon className="circle-icon" icon="fa-circle-user" />{" "}
          </div>
        </menu>
      </header>
      <Login display={display} setDisplay={setDisplay} />
    </>
  );
};

export default Header;
