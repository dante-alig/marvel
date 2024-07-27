import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({ search, setSearch, token }) => {
  const location = useLocation();

  return (
    <form
      className={
        location.pathname === `/likes/${token}` ? "hide-search" : "search-bar"
      }
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
            ? "rechercher un personage"
            : "rechercher un comics"
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
