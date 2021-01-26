import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/PersonService";
import Notification from "./components/Notification";

const App = () => {
  // State
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);

  // Effect Hook
  useEffect(
    () => personService.getAll().then((persons) => setPersons(persons)),
    []
  );

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`) === true) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  const personsToShow =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toUpperCase().includes(newFilter.toUpperCase())
        );

  const addName = (e) => {
    e.preventDefault();

    const personFound = persons.find((p) => p.name === newName);

    if (typeof personFound !== "undefined") {
      updateName(personFound);
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((person) => {
        setPersons(persons.concat(person));
        setNewName("");
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
    }
  };

  const updateName = (person) => {
    if (
      window.confirm(
        `${person.name} is already added to the phonebook, replace the old number with a new one?`
      ) === true
    ) {
      const updatedPerson = { name: person.name, number: newNumber };

      personService.update(person.id, updatedPerson).then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id !== person.id ? p : returnedPerson))
        );
        setMessage(`Updated ${newName}'s number`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
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

      <Notification message={message} />

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
      <Persons persons={personsToShow} deleteHandler={handleDelete} />
    </div>
  );
};

export default App;
