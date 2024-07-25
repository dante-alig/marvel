import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");

  return (
    <form
      className="search-bar"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input
        className="search-style"
        id="research"
        type="text"
        placeholder={
          location.pathname === "/"
            ? "recherche des persoonages"
            : "recherche de comics"
        }
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <FontAwesomeIcon className="magnifying-icon" icon="fa-magnifying-glass" />
    </form>
  );
};

export default Search;
