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

    if (!newName.trim()) {
      return alert("Name is invalid!");
    }

    let isExist = persons.find(({ name }) => name === newName);

    if (isExist) {
      return alert(`${newName} is already exist`);
    }

    setPersons((prev) => [...prev, { name: newName }]);
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
