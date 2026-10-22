import { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  
  useEffect(()=>{
    console.log('effect');
    axios
    .get("http://localhost:3000/persons")
    .then(response=>{
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  },[])

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

    if (persons.some((element) => element.name === newName)) {
      alert(`${newName} is already present in PhoneBook`);
      return;
    }
    if (persons.some((element) => element.number === newNumber)) {
      alert(`${newNumber} is already present in PhoneBook`);
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  const handleSearchNameChange = (event) => {
    console.log(event.target.value);
    setSearchName(event.target.value);
  };
  const displayedPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
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

      <Persons displayedPersons={displayedPersons} />
    </div>
  );
};
export default App;
