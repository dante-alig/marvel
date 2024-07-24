import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Comics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/marvel/comics");
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
          console.log(perso.thumbnails);
          return (
            <Link to={`/character/${perso._id}`} className="perso" key={index}>
              {perso?.thumbnail ? (
                <img
                  src={`${perso.thumbnail.path}.${perso.thumbnail.extension}`}
                  alt={`Thumbnail ${index}`}
                />
              ) : (
                <div className="notfound">a</div>
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Comics;
