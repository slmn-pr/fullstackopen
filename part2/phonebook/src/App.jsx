import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  function onFilter(event) {
    setFilter(event.target?.value ?? "");
  }

  function onNameChange(event) {
    let name = event.target.value;
    setNewName(name);
  }

  function onPhoneChange(event) {
    let phone = event.target.value;
    setNewPhone(phone);
  }

  function handleAddPerson(event) {
    event.preventDefault();

    const name = newName.trim();
    const number = newPhone.trim();
    if (!name) {
      return alert("Name is invalid!");
    } else if (!number) {
      return alert("Number is invalid!");
    }

    let isExist = persons.find((person) => person.name === name);

    if (isExist) {
      return alert(`${newName} already exists in the phonebook`);
    }

    setPersons((prev) => [...prev, { name, number, id: Date.now() }]);
    setNewName("");
    setNewPhone("");
  }

  const personToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.trim().toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilter={onFilter} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        onNameChange={onNameChange}
        onPhoneChange={onPhoneChange}
        handleAddPerson={handleAddPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={personToShow} />
    </div>
  );
};

export default App;
