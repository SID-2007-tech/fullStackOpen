const Persons = ({ displayedPersons, removePerson }) => {
  return (
    <>
      {displayedPersons.map((obj) => (
        <div key={obj.name}>
          {obj.name} : {obj.number}
          <button onClick={() => removePerson(obj.id)}>Remove</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
