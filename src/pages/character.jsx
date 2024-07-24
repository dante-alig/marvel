import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Character = () => {
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
        console.log(responseComics.data);
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
      <div className="character-box">
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt={`Thumbnail ${characterId}`}
        />
        <p>{characterId}</p>
      </div>
      <div className="character-bibliography-box">
        {dataComics.comics.map((comicsBooks, index) => {
          console.log(comicsBooks);
          return (
            <div className="character-bibliography" key={index}>
              <img
                src={`${comicsBooks.thumbnail.path}.${comicsBooks.thumbnail.extension}`}
                alt={`Thumbnail ${characterId}`}
              />
            </div>
          );
        })}

        <div className="character-apparitions"></div>
      </div>
    </>
  );
};

export default Character;
