import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  // state
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [newWeather, setNewWeather] = useState();

  // "Derived" state
  const filteredCountries = countries.filter((country) =>
    country.name.toUpperCase().includes(newFilter.toUpperCase())
  );

  // note the second parameter []... only fetch once
  useEffect(
    () =>
      axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
        setCountries(response.data);
      }),
    []
  );

  // fetch weather data
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const params = {
        appid: process.env.REACT_APP_API_KEY,
        units: "imperial",
        q: filteredCountries[0].capital,
      };

      console.log(params.appid);
      axios
        .get("https://api.openweathermap.org/data/2.5/weather", { params })
        .then((response) => {
          console.log(response);
          setNewWeather(response);
        });
    }
  }, [newFilter]);

  const applyFilter = (e) => setNewFilter(e.target.value);

  return (
    <>
      <Filter label="find countries" state={newFilter} onChange={applyFilter} />

      <Countries
        countries={filteredCountries}
        countryClick={applyFilter}
        weather={newWeather}
      />
    </>
  );
};

export default App;
