import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import fond from "../images/fond.png";
import AddToLikes from "../components/addToLikes";

const Character = ({
  setName,
  name,
  image,
  setImage,
  link,
  setLink,
  token,
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [dataComics, setDataComics] = useState(null);
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/marvel/characters/${characterId}`
        );
        setData(response.data);

        const responseComics = await axios.get(
          `http://localhost:3000/marvel/comics/${characterId}`
        );
        setDataComics(responseComics.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return loading ? (
    <main>
      <p>Loading...</p>
    </main>
  ) : (
    // Component after data is loaded
    <>
      {/* ------------PRESENTATION DU PERSONNAGE--------------- */}
      <div className="character-box">
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt={`Thumbnail ${characterId}`}
        />
        <div className="character-description">
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          {/* ------------ADD TO LIKES--------------- */}
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
          />
        </div>
      </div>

      {/* ------------COMICS --------------- */}
      <div className="character-bibliography-box">
        {dataComics.comics.map((comicsBooks, index) => {
          return (
            <div className="character-bibliography" key={index}>
              {comicsBooks.thumbnail.path.includes("image_not_available") ? (
                <img src={fond} alt="fond" />
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
