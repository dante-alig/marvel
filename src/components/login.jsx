import { useState } from "react";
import axios from "axios";

const Login = ({ display, setDisplay }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerif, setPasswordVerif] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [login, setLogin] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  const postData = async () => {
    try {
      const data = { email, password };
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
      setToken(response.data);
      console.log(response.data);
      console.log("le nom de la route est:", route(login));
      setError(null);
    } catch (error) {
      if (error.response) {
        setError(
          `Erreur ${error.response.status}: ${error.response.data.message}`
        );
      } else {
        setError("Erreur serveur ou autre: " + error.message);
      }
    }
  };

  return (
    <>
      <div
        className={display ? "bg-display" : "cover"}
        onClick={() => {
          setDisplay((prevDisplay) => {
            const newDisplay = !prevDisplay;
            document.body.style.overflow = newDisplay ? "auto" : "hidden";
            return newDisplay;
          });

          console.log("etat de la fenetre >>>>", popUp);
        }}
      ></div>
      <div className={display ? "bg-display" : "modal-box"}>
        <div className="windows">
          <p>{login ? "login" : "sign'up"}</p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (email && password && (login || password === passwordVerif)) {
              postData();
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
                placeholder="Retapez votre mot de passe"
                value={passwordVerif}
                onChange={(event) => setPasswordVerif(event.target.value)}
              />
            </div>
          )}
          <button>{login ? "Je me connecte" : "S'enregistrer"}</button>
          <p>ou</p>
          <p
            onClick={() => {
              setLogin(!login);
            }}
          >
            {login ? "S'enregistrer" : "Je me connecte"}
          </p>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Login;
