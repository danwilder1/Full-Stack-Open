import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  // state
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [newWeather, setNewWeather] = useState();
  const [currentWeatherLocation, setCurrentWeatherLocation] = useState("");

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
    if (
      filteredCountries.length === 1 &&
      filteredCountries[0].name !== currentWeatherLocation
    ) {
      // Make sure to start npm with environment variable set
      const api_key = process.env.REACT_APP_API_KEY;
      const location = filteredCountries[0].name;

      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${location}`
        )
        .then((response) => {
          setNewWeather(response.data);
        });

      setCurrentWeatherLocation(location);
    }
  }, [filteredCountries, currentWeatherLocation]);

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
