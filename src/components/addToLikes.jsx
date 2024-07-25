import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

const AddToLikes = ({
  name,
  setName,
  image,
  setImage,
  link,
  setLink,
  token,
  data,
  characterId,
}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setLink(`/character/${characterId}`);
    setImage(`${data.thumbnail.path}.${data.thumbnail.extension}`);
    setName(data.name);
    console.log(token);
  }, []);

  const postFavoris = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/marvel/likes",
        { name, image, link, token },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("le favori a été ajouté");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <button
      onClick={() => {
        postFavoris();
        console.log(token);
        console.log(image);
        console.log(link);
        console.log(name);
      }}
    >
      <FontAwesomeIcon className="star-icon" icon="fa-star" />
      Ajouter à mes favoris
    </button>
  );
};

export default AddToLikes;
