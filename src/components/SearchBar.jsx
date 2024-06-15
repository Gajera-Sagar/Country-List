import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function SearchBar({ setQuery }) {
  const [isdark] = useContext(ThemeContext);

  function inputChange(e) {
    setQuery(e.target.value.toLowerCase());
  }
  return (
    <div className={`search-container ${isdark ? "dark" : ""}`}>
      <i className="fa-solid fa-magnifying-glass" />
      <input
        onChange={inputChange}
        type="text"
        placeholder="Search for a country..."
      />
    </div>
  );
}

SearchBar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
//
