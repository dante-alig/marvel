import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddToLikes from "../components/addToLikes";

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
  const { comicId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      console.log("useparams>>>>>>>", comicId);
      try {
        const response = await axios.get(
          `http://localhost:3000/marvel/comic/${comicId}`
        );
        setData(response.data);
        console.log("la reponse pour comicId", response.data);
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
    <>
      {/* ------------PRESENTATION DU PERSONNAGE--------------- */}
      <div className="comic-box">
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt={`Thumbnail ${comicId}`}
        />
        <div className="comic-description">
          <h1>{data.title}</h1>
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
            comicId={comicId}
            setDisplay={setDisplay}
          />
        </div>
      </div>
    </>
  );
};

export default Comic;
