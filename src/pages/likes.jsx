import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Likes = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/likes/all");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
    console.log(token);
  }, [token]);

  return loading ? (
    <main>
      <p>Loading...</p>
    </main>
  ) : token ? (
    <main>
      <div className="container-box">
        {data.map((favoris, index) => {
          console.log(favoris.thumbnails);
          return (
            <Link to={favoris.name} className="perso" key={index}>
              <img src={favoris.link} alt={`Thumbnail ${index}`} />
            </Link>
          );
        })}
      </div>
    </main>
  ) : (
    <Navigate to="/" />
  );
};

export default Likes;
