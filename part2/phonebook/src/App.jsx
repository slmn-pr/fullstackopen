import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  // const [filterItems, setFilterItems] = useState(persons);

  function onNameChange(event) {
    let name = event.target.value;
    setNewName(name);
  }

  function onPhoneChange(event) {
    let phone = event.target.value;
    setNewPhone(phone);
  }

  function onFilter(event) {
    setFilter(event.target?.value ?? "");
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

    setPersons((prev) => [...prev, { name, phone, id: Date.now() }]);
    setNewName("");
    setNewPhone("");
  }

  const personToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.trim().toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input onChange={onFilter} />
      </div>

      <h2>Add a new</h2>
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
      {personToShow.length > 0 && (
        <ul>
          {personToShow.map((person) => (
            <li key={`${person.id}`}>
              {person.name} {person.phone}
            </li>
          ))}
        </ul>
      )}

      {!personToShow?.length && <p>There is no contact here!</p>}
    </div>
  );
};

export default App;
