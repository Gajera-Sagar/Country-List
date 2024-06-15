import { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Layout = () => {
  const [isDark, setISDark] = useState(
    JSON.parse(localStorage.getItem("isDarkTheme"))
  );

  return (
    <ThemeContext.Provider value={[isDark, setISDark]}>
      <Header theme={[isDark, setISDark]} />
      <Outlet context={isDark} />
    </ThemeContext.Provider>
  );
};

export default Layout;
