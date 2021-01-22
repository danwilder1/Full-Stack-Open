import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  // state
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [newWeather, setNewWeather] = useState();
  const [newCity, setNewCity] = useState("");

  // "Derived" state
  const filteredCountries = countries.filter((country) =>
    country.name.toUpperCase().includes(newFilter.toUpperCase())
  );

  // Single country to display so update if is different than current
  if (
    filteredCountries.length === 1 &&
    newCity !== filteredCountries[0].capital
  ) {
    setNewCity(filteredCountries[0].capital);
  }

  // Fetch countries. note the second parameter '[]' So it only fetches once
  useEffect(
    () =>
      axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
        setCountries(response.data);
      }),
    []
  );

  // fetch weather data when newCity changes
  useEffect(() => {
    // Skip initial state (i.e hasn't been set)
    if (newCity !== "") {
      const params = {
        appid: process.env.REACT_APP_API_KEY,
        units: "imperial",
        q: newCity.replace(/,/g, ""),
      };

      axios
        .get("https://api.openweathermap.org/data/2.5/weather", { params })
        .then((response) => {
          setNewWeather(response);
        });
    }
  }, [newCity]);

  const updateFilter = (e) => setNewFilter(e.target.value);

  return (
    <>
      <Filter
        label="find countries"
        state={newFilter}
        onChange={updateFilter}
      />

      <Countries
        countries={filteredCountries}
        countryClick={updateFilter}
        weather={newWeather}
      />
    </>
  );
};

export default App;
