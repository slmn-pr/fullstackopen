import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { create, getAll } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

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

  function addPersonToJson(person) {
    create(person)
      .then((response) => {
        setPersons((prev) => [...prev, response]);
      })
      .catch((error) => {
        console.error("[App] addPersonToJson error:", error);
        alert("Failed to add person!");
      });
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

    const newPerson = { name, number };
    addPersonToJson(newPerson);

    setNewName("");
    setNewPhone("");
  }

  const personToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.trim().toLowerCase()),
  );

  useEffect(() => {
    getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        console.error("[App] getAll error: ", error);
        alert("Failed to fetch persons!");
      });
  }, []);

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
