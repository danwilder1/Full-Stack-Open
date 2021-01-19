import React from "react";
import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  const numExercises = parts.reduce(
    (accumulator, part) => (accumulator += part.exercises),
    0
  );

  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}

      <Total value={numExercises} />
    </>
  );
};

export default Content;
