import "../style.css";
import SearchBar from "./SearchBar";
import CountryDropDown from "./CountryDropDown";
import CountryList from "./CountryList";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function App() {
  const [query, setQuery] = useState("");
  let [isDark] = useContext(ThemeContext);
  return (
    <>
      <main className={`${isDark ? "dark" : ""}`}>
        <div className="search-filter-container">
          <SearchBar setQuery={setQuery} />
          <CountryDropDown setQuery={setQuery} />
        </div>
        <CountryList query={query} />
      </main>
    </>
  );
}
