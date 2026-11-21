import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { create, editNumber, getAll, remove } from "./services/persons";

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

  function clearInputs() {
    setNewName("");
    setNewPhone("");
  }

  function addPersonToJson(person) {
    create(person)
      .then((response) => {
        setPersons((prev) => [...prev, response]);
        clearInputs();
      })
      .catch((error) => {
        console.error("[App] addPersonToJson error:", error);
        alert("Failed to add person!");
      });
  }

  function editPhoneNumber(person, number) {
    const updatedPerson = {
      ...person,
      number,
    };
    editNumber(person.id, updatedPerson)
      .then(() => {
        setPersons((prev) =>
          prev.map((item) =>
            item.id === person.id ? { ...item, number } : item,
          ),
        );
        clearInputs();
      })
      .catch((error) => {
        console.error("[App] editNumber error: ", error);
        alert("Failed to update phone number");
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

    let existPerson = persons.find((person) => person.name === name);

    if (existPerson) {
      let allowToEditNumber = confirm(
        `${name} already exists in the phonebook, replace the old number with a new one?`,
      );

      if (!allowToEditNumber) return;

      return editPhoneNumber(existPerson, number);
    }

    const newPerson = { name, number };
    addPersonToJson(newPerson);
  }

  function handleDeletePerson(id) {
    let existPerson = persons.find((person) => person.id === id);
    if (!existPerson) {
      return alert("Person not found!");
    }

    const allowed = confirm(`Delete ${existPerson.name} ?`);

    if (!allowed) {
      return;
    }

    remove(id)
      .then(() => {
        setPersons((prev) => prev.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.error("[App] handleDeletePerson error: ", error);
        alert("Delete person failed!");
      });
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
      <Persons persons={personToShow} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
