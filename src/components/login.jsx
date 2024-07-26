import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ display, setDisplay, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerif, setPasswordVerif] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [login, setLogin] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  {
    /* --------------- REQUETE --------------------- */
  }

  const postData = async () => {
    try {
      const route = (login) => {
        if (login) {
          return "login";
        } else {
          return "signup";
        }
      };
      const response = await axios.post(
        `http://localhost:3000/user/${route(login)}`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { token } = response.data;
      setToken(token);
      navigate("/");
      setDisplay(!display);
      Cookies.set("token", token);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {/* --------------- MODAL BACKGROUND --------------------- */}
      <div
        className={display ? "bg-display" : "cover"}
        onClick={() => {
          setDisplay((prevDisplay) => {
            const newDisplay = !prevDisplay;
            document.body.style.overflow = newDisplay ? "auto" : "hidden";
            return newDisplay;
          });
        }}
      ></div>

      {/* --------------- MODAL SIGNUP/LOGIN --------------------- */}
      <div className={display ? "bg-display" : "modal-box"}>
        <div className="windows">
          <p>{login ? "login" : "sign'up"}</p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (email && password && (login || password === passwordVerif)) {
              postData();
              setDisplay((prevDisplay) => {
                const newDisplay = !prevDisplay;
                document.body.style.overflow = newDisplay ? "auto" : "hidden";
                return newDisplay;
              });
              console.log("le formulaire a été envoyé");
            } else {
              setError("Vous devez remplir tous les champs.");
            }
          }}
        >
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {!login && (
            <div>
              <input
                id="passwordVerif"
                type="password"
                placeholder="confirmer le mot de passe"
                value={passwordVerif}
                onChange={(event) => setPasswordVerif(event.target.value)}
              />
            </div>
          )}
          <button>{login ? "Je me connecte" : "Je m'enregistre"}</button>
          <p>ou</p>
          <p
            className="modal-switch-infos"
            onClick={() => {
              setLogin(!login);
            }}
          >
            {login ? "Je m'enregistre" : "Je me connecte"}
          </p>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Login;
