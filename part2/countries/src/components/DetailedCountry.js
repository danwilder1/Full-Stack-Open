import React from "react";
import Languages from "./Languages";

const DetailedCountry = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>
      <div>capital {country.capital} </div>
      <div>
        population{" "}
        {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>

      <Languages languages={country.languages} />

      <img src={country.flag} alt="Country Flag" width="300" height="200" />
    </>
  );
};

export default DetailedCountry;
