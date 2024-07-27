import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fond from "../images/fond.png";
import loadingAnim from "../assets/marvel_logo.png";

const Home = ({ search }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requête GET pour récupérer les personnages Marvel
        const response = await axios.get(
          "http://localhost:3000/marvel/characters"
        );
        const characters = response.data.results;
        // Filtrage des personnages en fonction du terme de recherche
        const filterName = characters.filter((character) =>
          new RegExp(search, "i").test(character.name)
        );
        // Mise à jour de l'état 'data' en fonction de la présence ou non du terme de recherche
        if (search.length > 0) {
          setData(filterName);
        } else {
          setData(characters);
        }
      } catch (error) {
        // Gestion des erreurs lors de la requête
        console.error("Error fetching data:", error);
      }
      setLoading(false); // Mise à jour de l'état de chargement
    };

    fetchData();
  }, [search]); // Dépendance : useEffect se déclenche à chaque changement de 'search'

  // Rendu conditionnel en fonction de l'état de chargement
  return loading ? (
    <main className="loading-logo">
      <img src={loadingAnim} alt="loading animation" /> <p>loading...</p>
    </main>
  ) : (
    <main>
      {/* FICHES DES PERSONNAGES */}
      <div className="container-box">
        {/* Affichage des personnages récupérés */}
        {data.map((perso, index) => {
          return (
            <Link to={`/character/${perso._id}`} className="perso" key={index}>
              {/* Vérification si l'image du personnage est disponible */}
              {perso.thumbnail.path.includes("image_not_available") ? (
                <img src={fond} alt="fond" /> // Image de fond par défaut si l'image n'est pas disponible
              ) : (
                <img
                  src={`${perso.thumbnail.path}.${perso.thumbnail.extension}`}
                  alt={`Thumbnail ${index}`}
                />
              )}
              <div className="perso-infos">
                <div>{perso.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
