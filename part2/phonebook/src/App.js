import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/PersonService";

const App = () => {
  // State
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  // Effect Hook
  useEffect(
    () => personService.getAll().then((persons) => setPersons(persons)),
    []
  );

  const personsToShow =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toUpperCase().includes(newFilter.toUpperCase())
        );

  const addName = (e) => {
    e.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };

    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personService.create(person).then((person) => {
        setPersons(persons.concat(person));
        setNewName("");
      });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter state={newFilter} onChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addName}
        nameState={newName}
        onNameChange={handleNameChange}
        numberState={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
