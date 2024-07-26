import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, Link, Navigate } from "react-router-dom";

const Likes = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [deleted, setDeleted] = useState("");
  const [error, setError] = useState("");
  const [maj, setMaj] = useState(true);
  const { tokenParams } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/likes/${tokenParams}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [token, tokenParams, deleted, maj]);

  useEffect(() => {
    const deletedData = async () => {
      try {
        await axios.delete("http://localhost:3000/likes/deleted", {
          headers: { "Content-Type": "application/json" },
          data: { image: deleted },
        });
        setMaj(!maj);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    if (deleted) {
      deletedData();
    }
  }, [deleted]);

  return loading ? (
    <main>
      <p>Loading...</p>
    </main>
  ) : token ? (
    <main>
      <div className="container-box">
        {data.map((favoris, index) => {
          return (
            <div className="perso" key={index}>
              <Link to={favoris.link} className="perso">
                <img src={favoris.image} alt={`Thumbnail ${index}`} />
                <div className="perso-infos">
                  <div>{favoris.name}</div>
                </div>
              </Link>
              <div
                className="square-box"
                onClick={() => {
                  setDeleted(favoris.image);
                  console.log(deleted);
                }}
              >
                <FontAwesomeIcon className="square-icon" icon="fa-xmark" />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  ) : (
    <Navigate to="/" />
  );
};

export default Likes;
