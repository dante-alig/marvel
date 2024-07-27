import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, Link, Navigate } from "react-router-dom";
import loadingAnim from "../assets/marvel_logo.png";

const Likes = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [deleted, setDeleted] = useState("");
  const [error, setError] = useState("");
  const [maj, setMaj] = useState(true);
  const { tokenParams } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://test--marvel-backend--dqd24mcv82s5.code.run/likes/${tokenParams}`
        ); // Requête GET pour récupérer les likes de l'utilisateur
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [token, tokenParams, deleted, maj]);

  // Requête DELETE pour supprimer un favoris
  useEffect(() => {
    const deletedData = async () => {
      try {
        await axios.delete(
          "http://test--marvel-backend--dqd24mcv82s5.code.run/likes/deleted",
          {
            headers: { "Content-Type": "application/json" },
            data: { image: deleted },
          }
        );
        setMaj(!maj); // Mise à jour de l'état maj pour rafraîchir les données
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    if (deleted) {
      deletedData(); // Appel de la fonction deletedData si un élément est marqué pour suppression
    }
  }, [deleted]);

  return loading ? (
    <main className="loading-logo">
      <img src={loadingAnim} alt="loading animation" />
      <p>loading...</p>
    </main>
  ) : token ? ( // Rendu conditionnel basé sur la présence du token
    <main>
      <div className="container-box">
        {data.map((favoris, index) => {
          return (
            <div className="perso" key={index}>
              <Link to={favoris.link} className="perso">
                <img src={favoris.image} alt={`Thumbnail ${index}`} />
                <div className="perso-infos">
                  <div>{favoris.name}</div>
                </div>
              </Link>
              <div
                className="square-box"
                onClick={() => {
                  setDeleted(favoris.image); // Mise à jour de l'état deleted avec l'image du favori
                  console.log(deleted);
                }}
              >
                <FontAwesomeIcon className="square-icon" icon="fa-xmark" />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  ) : (
    <Navigate to="/" /> // Redirection vers la page d'accueil si le token est absent
  );
};

export default Likes;
