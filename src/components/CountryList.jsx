import { useEffect } from "react";
import { useState } from "react";
import "../cssFile/CountryListSheemar.css"
import Countrycard from "./Countrycard";
import CountryListSheemar from "./CountryListSheemar";

export default function CountryList({query}) {
 const [CountryData, setCountryData] = useState([]);
useEffect(()=>{
  fetch('https://restcountries.com/v3.1/all')
  .then ((res)=>res.json())
  .then ((Data)=>{
    setCountryData(Data)
  })
},[])

  return CountryData.length === 0 ? (<CountryListSheemar/>):(
    <>
      <div className="countries-container">
        {CountryData.filter((country) =>
          country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)
        ).map((country) => {
          return (
            <Countrycard
              key={country.name.common} 
              name={country.name.common}
              flag={country.flags.svg}
              population={country.population}
              region={country.region}
              capital={country.capital}
              data={country}
              
            />
          );
        })}
      </div>

    </>
  );
}
