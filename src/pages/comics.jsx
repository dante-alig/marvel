import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fond from "../images/fond-comics.png";
import loadingAnim from "../assets/marvel_logo.png";

const Comics = ({ search }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requête GET pour obtenir les comics depuis l'API
        const response = await axios.get(
          "https://test--marvel-backend--dqd24mcv82s5.code.run/marvel/comics"
        );
        const comics = response.data.results;

        // Filtrage des comics en fonction du terme de recherche
        const filterName = comics.filter((comic) =>
          new RegExp(search, "i").test(comic.title)
        );

        // Mise à jour de l'état des données en fonction de la recherche
        if (search.length > 0) {
          setData(filterName);
        } else {
          setData(comics);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [search]); // useEffect se déclenche à chaque modification de la prop "search"

  return loading ? (
    // Affichage de l'animation de chargement
    <main className="loading-logo">
      <img src={loadingAnim} alt="loading animation" />
      <p>loading...</p>
    </main>
  ) : (
    <main>
      <div className="comics-box">
        {data.map((comics, index) => {
          return (
            // Chaque comic est affiché et ont peux cliquer vers sa page détaillée
            <Link to={`/comic/${comics._id}`} className="comics" key={index}>
              {comics.thumbnail.path.includes("image_not_available") ? (
                // Si l'image n'est pas disponible, une image de fond est affichée
                <img src={fond} alt="fond" />
              ) : (
                // Sinon, la vignette du comic est affichée
                <img
                  src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                  alt={`Thumbnail ${index}`}
                />
              )}
              <div className="comics-infos">
                <h2>{comics.title}</h2>
                <p>{comics.description}</p>
                <button>Lire la suite</button>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

// Exportation du composant pour être utilisé ailleurs
export default Comics;
