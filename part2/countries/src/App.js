import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);

  // note the second parameter []... only fetch once
  useEffect(
    () =>
      axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
        setCountries(response.data);
      }),
    []
  );

  const filteredCountries = countries.filter((country) =>
    country.name.toUpperCase().includes(newFilter.toUpperCase())
  );

  return (
    <>
      <Filter
        label="find countries"
        state={newFilter}
        onChange={(e) => setNewFilter(e.target.value)}
      />

      <Countries countries={filteredCountries} />
    </>
  );
};

export default App;