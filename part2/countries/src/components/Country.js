import React from "react";
import Button from "./Button";

const Country = ({ country, onClick }) => {
  return (
    <div>
      {country.name}{" "}
      <Button text="show" onClick={onClick} value={country.name} />
    </div>
  );
};

export default Country;
