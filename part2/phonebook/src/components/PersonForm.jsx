import { useState } from "react";

export default function PersonForm({ persons, setPersons }) {
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

  return (
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
  );
}
