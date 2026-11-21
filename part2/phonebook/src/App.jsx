import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  function onNameChange(event) {
    let name = event.target.value;
    setNewName(name);
  }

  function handleAddPerson(event) {
    event.preventDefault();

    const name = newName.trim();
    if (!name) {
      return alert("Name is invalid!");
    }

    let isExist = persons.find((person) => person.name === name);

    if (isExist) {
      return alert(`${newName} already exists in the phonebook`);
    }

    setPersons((prev) => [...prev, { name }]);
    setNewName("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={`${person.name}-${index}`}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
