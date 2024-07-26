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
        console.log("liste de toute les comics", response.data);
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
      <div className="comics-box">
        {data.results.map((comics, index) => {
          return (
            <Link to={`/comic/${comics._id}`} className="comics" key={index}>
              <img
                src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                alt={`Thumbnail ${index}`}
              />
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

export default Comics;
