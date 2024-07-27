import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ display, setDisplay, setToken }) => {
  const [email, setEmail] = useState(""); // État pour l'email
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [passwordVerif, setPasswordVerif] = useState(""); // État pour la vérification du mot de passe (inscription)
  const [login, setLogin] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const postData = async () => {
    try {
      // Fonction pour déterminer la route en fonction du mode (connexion ou inscription)
      const route = (login) => {
        return login ? "login" : "signup";
      };

      // Envoi de la requête POST avec les données de l'utilisateur
      const response = await axios.post(
        `https://test--marvel-backend--dqd24mcv82s5.code.run/user/${route(
          login
        )}`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" }, // En-tête pour spécifier le type de contenu
        }
      );

      const { token } = response.data;
      setToken(token); // Mise à jour du token dans l'état parent
      navigate("/"); // Redirection vers la page d'accueil
      setDisplay(!display); // Fermeture de la fenêtre de connexion/inscription
      Cookies.set("token", token); // Stockage du token dans un cookie
      setError(null); // Réinitialisation de l'erreur
    } catch (error) {
      // Gestion des erreurs
      setError(error.response.data.message); // Mise à jour de l'erreur avec le message du serveur
    }
  };

  return (
    <>
      {/* --------------- FOND DE LA MODALE --------------------- */}
      <div
        className={display ? "bg-display" : "cover"}
        onClick={() => {
          setDisplay((prevDisplay) => {
            const newDisplay = !prevDisplay;
            document.body.style.overflow = newDisplay ? "auto" : "hidden"; // Gestion du défilement de la page
            return newDisplay;
          });
        }}
      ></div>

      {/* --------------- MODALE D'INSCRIPTION/CONNEXION --------------------- */}
      <div className={display ? "bg-display" : "modal-box"}>
        <div className="windows">
          <p>{login ? "login" : "sign'up"}</p>{" "}
          {/* Affichage du titre en fonction du mode */}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault(); // Empêcher le rechargement de la page au submit
            if (email && password && (login || password === passwordVerif)) {
              postData(); // Appel de la fonction postData si les champs sont remplis
              setDisplay((prevDisplay) => {
                const newDisplay = !prevDisplay;
                document.body.style.overflow = newDisplay ? "auto" : "hidden";
                return newDisplay;
              });
              console.log("le formulaire a été envoyé");
            } else {
              setError("Vous devez remplir tous les champs."); // Affichage d'une erreur si les champs ne sont pas remplis
            }
          }}
        >
          {/* Champ pour l'email */}
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {/* Champ pour le mot de passe */}
          <div>
            <input
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {/* Champ pour la vérification du mot de passe (affiché uniquement en mode inscription) */}
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

          {/* Bouton de soumission du formulaire */}
          <button>{login ? "Je me connecte" : "Je m'enregistre"}</button>
          <p>ou</p>

          {/* Lien pour basculer entre connexion et inscription */}
          <p
            className="modal-switch-infos"
            onClick={() => {
              setLogin(!login);
            }}
          >
            {login ? "Je m'enregistre" : "Je me connecte"}
          </p>

          {/* Affichage des erreurs */}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Login; // Exportation du composant pour utilisation dans d'autres fichiers
