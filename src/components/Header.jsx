import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

 
export default function Header({theme}) {
const [isDark, setIsDark] = useContext(ThemeContext)
function changeMode() {
  const newIsDark = !isDark;
  setIsDark(newIsDark);
  localStorage.setItem('isDarkTheme', newIsDark);
}

  return (
    <header className={`header-container ${isDark ? "dark" : ''}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>
        <p className="theme-changer" onClick={changeMode}>
          <i className={`fa-solid fa-${isDark ? "sun":"moon"}`}></i>&nbsp;&nbsp;{isDark? "Light":"Dark"} Mode
        </p>
      </div>
    </header>
  );
}
