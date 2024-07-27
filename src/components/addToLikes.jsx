import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Composant AddToLikes qui permet d'ajouter un personnage ou un comic aux favoris
const AddToLikes = ({
  name, // Nom du personnage
  setName,
  image, // URL de l'image du personnage
  setImage,
  link, // Lien vers la page du personnage ou du comic
  setLink,
  token, // Jeton d'authentification de l'utilisateur
  data,
  characterId, // Identifiant du personnage
  comicId, // Identifiant du comic
  setDisplay,
}) => {
  const [error, setError] = useState(null);
  const [likeAction, setlikeAction] = useState("Ajouter à mes favoris");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === `/character/${characterId}`) {
      // Si l'URL correspond à un personnage
      setLink(`/character/${characterId}`); // Met à jour le lien
      setImage(`${data.thumbnail.path}.${data.thumbnail.extension}`); // Met à jour l'image
      setName(data.name); // Met à jour le nom
    } else {
      // Si l'URL correspond à un comic
      setLink(`/comic/${comicId}`); // Met à jour le lien
      setImage(`${data.thumbnail.path}.${data.thumbnail.extension}`); // Met à jour l'image
      setName(data.title); // Met à jour le titre
    }
  }, [location, characterId, comicId, data, setImage, setLink, setName]);

  // Fonction pour envoyer une requête POST pour ajouter un favori
  const postFavoris = async () => {
    try {
      const response = await axios.post(
        "http://test--marvel-backend--dqd24mcv82s5.code.run/marvel/likes",
        { name, image, link, token },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <button
      onClick={() => {
        if (token) {
          // Si l'utilisateur est authentifié
          postFavoris(); // Envoi des informations du favori au serveur
          setlikeAction("enregistré dans favoris"); // Mise à jour du texte du bouton
        } else {
          // Si l'utilisateur n'est pas authentifié
          setDisplay((prevDisplay) => {
            // Ouvre la modal de connexion
            const newDisplay = !prevDisplay;
            document.body.style.overflow = newDisplay ? "auto" : "hidden";
            return newDisplay;
          });
        }
      }}
    >
      <FontAwesomeIcon className="star-icon" icon="fa-star" /> {likeAction}
    </button>
  );
};

export default AddToLikes; // Exportation du composant
