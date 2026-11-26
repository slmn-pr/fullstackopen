import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { create, getAll, remove } from "./services/persons";
import Alert from "./components/Alert";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [alertInfo, setAlertInfo] = useState({
    show: false,
    success: false,
    message: "",
  });

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

        // Show alert
        setAlertInfo(() => ({
          show: true,
          success: true,
          message: `${person.name} Added successfully!`,
        }));
      })
      .catch((error) => {
        console.error("[App] addPersonToJson error:", error);
        setAlertInfo(() => ({
          show: true,
          success: false,
          message: "Failed to add person!",
        }));
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

    // If exist update phone number
    if (existPerson) {
      return alert("This phone number already exists in the phonebook.");
    }

    const newPerson = { name, number };
    addPersonToJson(newPerson);
  }

  function handleDeletePerson(id) {
    let existPerson = persons.find((person) => person._id === id);
    if (!existPerson) {
      return alert("Person not found!");
    }

    const allowed = confirm(`Delete ${existPerson.name} ?`);

    if (!allowed) {
      return;
    }

    remove(id)
      .then(() => {
        setPersons((prev) => prev.filter((person) => person._id !== id));

        setAlertInfo({
          show: true,
          success: false,
          message: `Information of ${existPerson.name} deleted successfully!`,
        });
      })
      .catch((error) => {
        console.error("[App] handleDeletePerson error: ", error);
        setAlertInfo({
          show: true,
          success: false,
          message: "Delete person failed!",
        });
      });
  }

  const personToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.trim().toLowerCase()),
  );

  // Fetch all contacts
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

  // Handle show alert timeout
  useEffect(() => {
    if (!alertInfo.show) return;

    const timeout = setTimeout(() => {
      setAlertInfo({ message: "", show: false, success: false });
    }, 3_000);

    return () => {
      return clearTimeout(timeout);
    };
  }, [alertInfo.show, alertInfo.message]);

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Alert section */}
      {alertInfo.show && (
        <Alert message={alertInfo.message} success={alertInfo.success} />
      )}

      {/* Filter */}
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
