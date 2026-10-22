import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import axios from "axios";
import appendService from "./services/appendData";
const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3000/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const addToPhoneBook = (event) => {
    event.preventDefault();
    let flag = false;
    persons.forEach((element) => {
      if (element.name === newName) {
        if (element.number === newNumber) {
          alert(`entry is already present in PhoneBook`);
          flag = true;
          return;
        } 
        else {
          const person = persons.find((person) => person.id === element.id);
          const changedPerson = { ...person, number: newNumber };
          axios
            .put(`http://localhost:3000/persons/${element.id}`, changedPerson)
            .then((response) => {
              setPersons(
                persons.map((person) =>
                  person.id === element.id ? response.data : person,
                ),
              );
            });
            flag = true;
          return;
        }
      }
    });
    
    if(flag) return;
    if (persons.some((element) => element.number === newNumber)) {
      alert(`${newNumber} is already present in PhoneBook`);
      flag = true;
      return;
    }
    if(flag) return;
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    appendService.append(nameObject).then((data) => {
      setPersons(persons.concat(data));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleSearchNameChange = (event) => {
    console.log(event.target.value);
    setSearchName(event.target.value);
  };

  const removePerson = (id) => {
    axios.delete(`http://localhost:3000/persons/${id}`);
    setPersons(
      persons.filter((element) => {
        return element.id != id;
      }),
    );
  };
  const displayedPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase()),
  );
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        searchName={searchName}
        handleSearchNameChange={handleSearchNameChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        addToPhoneBook={addToPhoneBook}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        displayedPersons={displayedPersons}
        removePerson={removePerson}
      />
    </div>
  );
};
export default App;
