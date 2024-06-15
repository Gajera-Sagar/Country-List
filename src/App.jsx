import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import CountryContainer from "./components/CountryContainer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="/:country" element={<CountryContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
