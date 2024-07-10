import React, {useState} from "react";
import './App.css';
import {pets} from './pets';

// Filter pets by name 
function petNameFilter(filterName) {
  return function (petObject) {
    return petObject.name.toLowerCase().includes(filterName.toLowerCase());
  }
}

// Get total price
function getBasketTotal(acc, obj) {
  return acc + obj.price;
}

function App() {
  const[petName, setPetName] = useState("");  
  function onSearchNameChange(event) {
    setPetName(event.target.value);
  }
  return (
    <>      
      Pet Name: <input onChange={onSearchNameChange} type="text"/>
      <PetsList pets={pets} petName={petName}/>
    </>
  )
}

// Display filted pets list
function PetsList(props) {  
  // Whether to display details of a pet
  const[displayDetail, setDisplayDetail] = useState(false);
  function onClickDetail() {
    setDisplayDetail(!displayDetail);
  }
  const filteredPets = props.pets.filter(petNameFilter(props.petName));
  return (<>    
    Total Price: {filteredPets.reduce(getBasketTotal, 0)} 
    Total Number: {filteredPets.length}
    {filteredPets.map((p, index) => (
      <p key={index}><b>{p.id}</b>, <b>{p.name}</b>, <b>{p.category}</b>
      <button onClick={onClickDetail}>Display Detail</button>
      {displayDetail && "pets"} </p> 
    ))}  </>
  );
}

export default App;
