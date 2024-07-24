import { useState } from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input
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
    </form>
  );
};

export default Search;
