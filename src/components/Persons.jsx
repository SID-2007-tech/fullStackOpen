const Persons = ({displayedPersons})=>{
    return (
        <>
        {displayedPersons.map(obj => (<div key = {obj.name}>{obj.name} : {obj.number}</div>))}
        </>
    )
}

export default Persons;