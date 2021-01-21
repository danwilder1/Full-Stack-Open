import React from "react";

const Languages = ({ languages }) => {
  return (
    <>
      <h3>languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Languages;
