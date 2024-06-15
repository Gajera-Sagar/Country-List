import { useContext, useState } from "react";
import { useEffect } from "react";
import "../cssFile/country.css";
import '../cssFile/countryContainer.css'
import CountryContainerShimer from "./CountryContainerShimer";
import { Link, useParams } from "react-router-dom";
import PageNotFund from "./PageNotFund";
import { ThemeContext } from "../context/ThemeContext";

export default function CountryContainer() {
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
 let [isDark]= useContext(ThemeContext)

  const param = useParams();

  const countryName = param.country;

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        setCountryData({
          name: data.name.common,
          nativeName: Object.values(data.name.nativeName)[0].common,
          population: data.population.toLocaleString("en-IN"),
          region: data.region,
          subregion: data.subregion,
          capital: data.capital[0],
          currencies: Object.values(data.currencies)
            .map((e) => e.name)
            .join(", "),
          languages: Object.values(data.languages).join(", "),
          topLevelDomain: data.tld.join(", "),
          flag: data.flags.svg,
          borders: [],
        });
        if(data.borders !== undefined){
          data.borders.map((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((res) => res.json())
              .then(([countryBorder]) => {
                setCountryData((prevState)=>(
                  {...prevState, borders: [...prevState.borders, countryBorder.name.common]}
                ))
              });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      });
  }, [countryName]);

  if (notFound) {
    return (
     <PageNotFund/>
    );
  }

  return countryData === null ? (
    <CountryContainerShimer />
  ) : (
    <>
    <div className={`main-country-detail-container ${isDark ? "dark" : ''}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => window.history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt="" />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: </b>
                <span className="native-name"></span>
                {countryData.nativeName}
              </p>
              <p>
                <b>Population: </b>
                <span className="population"></span>
                {countryData.population}
              </p>
              <p>
                <b>Region: </b>
                <span className="region"></span>
                {countryData.region}
              </p>
              <p>
                <b>Sub Region: </b>
                <span className="sub-region"></span>
                {countryData.subregion}
              </p>

              <p>
                <b>Capital: </b>
                <span className="capital"></span>
                {countryData.capital}
              </p>
              <p>
                <b>Top Level Domain: </b>
                <span className="top-level-domain">
                  {countryData.topLevelDomain}
                </span>
              </p>
              <p>
                <b>Currencies: </b>
                <span className="currencies"></span>
                {countryData.currencies}
              </p>
              <p>
                <b>Languages: </b>
                <span className="languages"></span>
                {countryData.languages}
              </p>
            </div>
            {countryData.borders.length !== 0 && 
              <div className="border-countries">
                <b>Border Countries: </b>&nbsp;
                {countryData.borders.map((border) => (
                  <Link key={border} to={`/${border}`}>
                    {border}
                  </Link>
                ))}
              </div>
           }
            {/* in Link [to] attribute use a ./ in url name is added behind the previous url else it replace the previous url
       example of ./ = www.app/india click on the other country url is www.app/india/nepal
       example of only / = www.app/india click on the other country url is www.app/nepal */}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
