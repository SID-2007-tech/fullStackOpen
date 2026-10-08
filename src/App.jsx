import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: "Arto Hellas", number: "040-123456", id: 1 },
//     { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
//     { name: "Dan Abramov", number: "12-43-234345", id: 3 },
//     { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
//   ]);
//   const [newName, setNewName] = useState("");
//   const [newNumber, setNewNumber] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [displayedPersons,setDisplayedPersons] = useState([]);
//   const handleNameChange = (event) => {
//     console.log(event.target.value);
//     setNewName(event.target.value);
//   };
//   const handleNumberChange = (event) => {
//     console.log(event.target.value);
//     setNewNumber(event.target.value);
//   };

//   const addToPhoneBook = (event) => {
//     event.preventDefault();

//     if (persons.some((element) => element.name === newName)) {
//       alert(`${newName} is already present in PhoneBook`);
//       return;
//     }
//     if (persons.some((element) => element.number === newNumber)) {
//       alert(`${newNumber} is already present in PhoneBook`);
//       return;
//     }

//     const nameObject = {
//       name: newName,
//       number: newNumber,
//     };

//     setPersons(persons.concat(nameObject));
//     setNewName("");
//     setNewNumber("");
//   };

//   const handleSearchNameChange = (event) =>{
//     console.log(event.target.value)
//     setSearchName(event.target.value)
//     let ans = []
//     persons.forEach(obj => {

//       if(obj.name.toLowerCase().includes(searchName.toLowerCase())){
//         ans = ans.concat(obj)
//       }
//     });
//     setDisplayedPersons(ans)
//   }

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <div>

//           filter shown with<input value={searchName} onChange={handleSearchNameChange} />
//       </div>
//       <div>Add a New</div>
//       <form onSubmit={addToPhoneBook}>
//         <div>
//           Name: <input value={newName} onChange={handleNameChange} />
//         </div>
//         <div>
//           Number: <input value={newNumber} onChange={handleNumberChange} />
//         </div>
//         <div>
//           <button type="submit">add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//       {displayedPersons.map(obj => (<div key = {obj.name}>{obj.name} : {obj.number}</div>))}

//       <div>
//         debug: {newName} -- {newNumber}
//       </div>
//     </div>
//   );
// };

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  
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
