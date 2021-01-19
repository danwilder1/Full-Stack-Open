import React from "react";
import Person from "./Person";

const Numbers = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>

      {persons.map((person) => (
        <Person key={person.name} name={person.name} />
      ))}
    </>
  );
};

export default Numbers;
