import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

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
    const phone = newPhone.trim();
    if (!name) {
      return alert("Name is invalid!");
    } else if (!phone) {
      return alert("Phone is invalid!");
    }

    let isExist = persons.find((person) => person.name === name);

    if (isExist) {
      return alert(`${newName} already exists in the phonebook`);
    }

    setPersons((prev) => [...prev, { name, phone }]);
    setNewName("");
    setNewPhone("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>

        <div>
          number: <input value={newPhone} onChange={onPhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={`${person.name}-${person.phone}`}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
