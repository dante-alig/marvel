import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddToLikes from "../components/addToLikes";
import loadingAnim from "../assets/marvel_logo.png";

const Comic = ({
  setName,
  name,
  image,
  setImage,
  link,
  setLink,
  token,
  display,
  setDisplay,
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { comicId } = useParams(); // Récupération du paramètre comicId depuis l'URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requête pour obtenir les données du comic depuis le serveur
        const response = await axios.get(
          `http://test--marvel-backend--dqd24mcv82s5.code.run/marvel/comic/${comicId}`
        );
        setData(response.data);
        console.log("la reponse pour comicId", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [comicId]); // Dépendance de l'effet sur comicId

  // Rendu conditionnel : affichage du chargement ou des données du comic
  return loading ? (
    <main className="loading-logo">
      <img src={loadingAnim} alt="loading animation" />
      <p>loading...</p>
    </main>
  ) : (
    <>
      {/*PRESENTATION DU COMIC */}
      <div className="comic-box">
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt={`Thumbnail ${comicId}`}
        />
        <div className="comic-description">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          {/* BOUTON AJOUTER AUX FAVORIS */}
          <AddToLikes
            name={name}
            setName={setName}
            link={link}
            setLink={setLink}
            image={image}
            setImage={setImage}
            token={token}
            data={data}
            comicId={comicId}
            setDisplay={setDisplay}
          />
        </div>
      </div>
    </>
  );
};

export default Comic;
