/* This is the ShowPetsComponent 
It is primarily used to allow us to display pets
and encapsulate this code away from the parent App component */
import React, {useState, useEffect} from "react";
function PetsComponent(props) {

  // Whether to display details of a pet
  const[displayDetail, setDisplayDetail] = useState(false);

  function onClickDetail() {
    setDisplayDetail(!displayDetail);
  }
  
  return (<>Total: {props.APIData.length}
    {props.APIData.sort(props.sorting).map((p, index) => (
      <p key={index}><b>{p.id}</b>, <b>{p.name}</b>, <b>{p.category}</b>, <b>{p.subcategory}</b>
      <button onClick={onClickDetail}>Display Detail</button>
      {displayDetail && "pets"} 
      <button onClick={() => props.addPetToBasket(p)}>Add to basket</button></p> 
    ))} </>
  );
}

export default PetsComponent;
