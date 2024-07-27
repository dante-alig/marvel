import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import fond from "../images/fond.png";
import AddToLikes from "../components/addToLikes";
import loadingAnim from "../assets/marvel_logo.png";

const Character = ({
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
  const [dataComics, setDataComics] = useState(null);
  // Extraction du paramètre de l'URL pour identifier le personnage
  const { characterId } = useParams();

  useEffect(() => {
    // Fonction pour récupérer les données du personnage et des comics
    const fetchData = async () => {
      try {
        // Requête pour obtenir les informations du personnage
        const response = await axios.get(
          `http://localhost:3000/marvel/characters/${characterId}`
        );
        setData(response.data);

        // Requête pour obtenir les informations des comics liés au personnage
        const responseComics = await axios.get(
          `http://localhost:3000/marvel/comics/${characterId}`
        );
        setDataComics(responseComics.data);
      } catch (error) {
        // Gestion des erreurs
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [characterId]);

  return loading ? (
    // Rendu conditionnel en fonction de l'état de chargement
    <main className="loading-logo">
      <img src={loadingAnim} alt="loading animation" />
      <p>loading...</p>
    </main>
  ) : (
    // Affichage des informations une fois les données récupérées
    <>
      {/*PRESENTATION DU PERSONNAGE*/}
      <div className="character-box">
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt={`Thumbnail ${characterId}`}
        />
        <div className="character-description">
          <h1>{data.name}</h1>
          <p>{data.description}</p>

          {/* bouton pour ajouter aux favoris */}
          <AddToLikes
            name={name}
            setName={setName}
            link={link}
            setLink={setLink}
            image={image}
            setImage={setImage}
            token={token}
            data={data}
            characterId={characterId}
            setDisplay={setDisplay}
          />
        </div>
      </div>

      {/* LISTES DES COMICS EN LIEN AVEC LE PERSONNAGE*/}
      <div className="character-bibliography-box">
        {dataComics.comics.map((comicsBooks, index) => {
          return (
            <div className="character-bibliography" key={index}>
              {/* Vérification si l'image du personnage est disponible */}
              {comicsBooks.thumbnail.path.includes("image_not_available") ? (
                <img src={fond} alt="fond" /> // Image de fond par défaut si l'image n'est pas disponible
              ) : (
                <img
                  src={`${comicsBooks.thumbnail.path}.${comicsBooks.thumbnail.extension}`}
                  alt={`Thumbnail ${index}`}
                />
              )}
            </div>
          );
        })}

        <div className="character-apparitions"></div>
      </div>
    </>
  );
};

export default Character;
