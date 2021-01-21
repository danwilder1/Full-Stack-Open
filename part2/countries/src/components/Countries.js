import React from "react";
import Country from "./Country";
import DetailedCountry from "./DetailedCountry";

const Countries = ({ countries }) => {
  // No matches or too many
  if (countries.length === 0) {
    return <div>No matches, specify another filter</div>;
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  // More than 1 and less than 10 -> show list of the countries
  else if (countries.length > 1) {
    return (
      <>
        {countries.map((country) => (
          <Country key={country.name} name={country.name} />
        ))}
      </>
    );
  }

  // Exactly one match show details
  else {
    return <DetailedCountry country={countries[0]} />;
  }
};

export default Countries;
