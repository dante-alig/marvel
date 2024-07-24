import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fond from "../images/fond.png";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/marvel/characters"
        );
        setData(response.data);
        console.log(response.data);
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
    <main>
      <div className="container-box">
        {data.results.map((perso, index) => {
          return (
            <Link to={`/character/${perso._id}`} className="perso" key={index}>
              {perso.thumbnail.path.includes("image_not_available") ? (
                <img src={fond} alt="fond" />
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
