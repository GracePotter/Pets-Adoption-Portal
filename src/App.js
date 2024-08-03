import React, {useState, useEffect} from "react";
import './App.css';
import PetsComponent from "./components/pets/Pets";
import BasketComponent from "./components/basket/Basket";
import "bootstrap/dist/css/bootstrap.min.css";
// import {pets} from './pets';

function App() { 

  // Pet category selected
  const[category, setCategory] = useState(null);
  // Pet subcategory selected
  const[subCategory, setSubCategory] = useState(null);
  // The pets list you wish to adopt
  const[basket, setBasket] = useState([]);
  // State of button Empty Basket
  const[active, setActive] = useState(false);
    // Data from API
  const[data, setData] = useState([]);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState(null);

  // Allow for switching between differnt pets categories
  function changeCategory(petCategory) {
    setCategory(petCategory);
  }
  // Allow for switching between differnt pets subcategories
  function changeSubCategory(event) {
    setSubCategory(event.target.value);
  }
  // A filter function for pet category and subCategory
  function categoryFilter(petCategory, petSubCategory) {    
    return function (petObject) {
      if (!petCategory && !petSubCategory) {
        // Return all data by default
        return petObject;
      } else {
        if (petSubCategory === null) {
          return petObject.category === petCategory; 
        } else {
          return petObject.category === petCategory && petObject.subcategory === petSubCategory;
        }
      }
    };
  }    
  // Add the pet in basket array
  function addPetToBasket(pet) {
    setBasket([...basket, pet]);
    alert(basket.length);
    if (basket.length > 0) {
      setActive(false);
      alert(false);
    } else {
      setActive(true);
      alert(true);
    }
  }
  // Remove all the items from the basket
  function emptyBasket() {
    setBasket([]);
  }
  // Check if the current object in the array has same id as the object passed
  function findObjectIndex(needle) {
    return function (haystack) {
      return haystack.id === needle.id;
    };
  }
  // Remove an object from the basket
  function removePetFromBasket(item) {
    let n = basket.findIndex(findObjectIndex(item));
    setBasket([...basket.slice(0, n), ...basket.slice(n + 1, basket.length)]);
  }  
  // A sort function for pet id
  function compareIdAsc(petA, petB) {
    let comparsion = 0;
    if (petA.id > petB.id) {
      comparsion = 1;
    } else if (petA.id < petB.id) {
      comparsion = -1;
    }
    return comparsion;
  }
  // A sort function for subcategory
  function compareSubCategoryAsc(subCatA, subCatB) {
    let comparsion = 0;
    let subCatALower = subCatA.subcategory.toLowerCase();
    let subCatBLower = subCatB.subcategory.toLowerCase();
    if (subCatALower > subCatBLower) {
      comparsion = 1;
    } else if (subCatALower > subCatBLower) {
      comparsion = -1;
    }
    return comparsion;
  }

  useEffect(()=>{
    // Fetch all pets information from API
    const URL = "https://raw.githubusercontent.com/GraceYZC/Pets-Adoption-Portal/main/data/pets.js";
    async function fetchData() {
      try {
        const response = await fetch(URL);
        const json = await response.json();
        setLoading(true);
        setData(json);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  },[]);

  // Data filtered with category and subcategory
  let catFilteredPets = data.filter(categoryFilter(category, subCategory));  
  // Check if there is item in basket
  //setActive(false);

  if (error) {
    return <h1>Opps! Error occured: {error.toString()} </h1>;
  } else if (loading === false) {
    return <h1>Waiting...</h1>;
  } else {
    return (
      <>     
      <div class="container-fluid">selected subcategory is {subCategory}
        <h2>We have {catFilteredPets.length} items for sale, right now!</h2>
        {/* <form> */}
          <button onClick={()=>changeCategory("Dog")} class="btn btn-warning">Dogs</button>&nbsp;
          <button onClick={()=>changeCategory("Cat")}>Cats</button>&nbsp;
          <button onClick={()=>changeCategory("Monkey")}>Monkeys</button>&nbsp;
          <button onClick={()=>changeCategory(null)}>Reset Choice</button>
          <select onChange={changeSubCategory} class="form-control" id="selsubcategory">
          <option key="-1" value=""><strong>--Please Select--</strong></option>
            {catFilteredPets.sort(compareSubCategoryAsc).map((pet, key) => (
              <option key={key} value={pet.subcategory}><strong>{pet.subcategory}</strong></option>))}
          </select>
          {/* {basket.length > 0 && ( */}
            <button onClick={emptyBasket} disabled={!active}>Empty Basket</button>
          {/* )} */}
        {/* </form> */}
        <PetsComponent APIData={catFilteredPets} addPetToBasket={addPetToBasket} sorting = {compareIdAsc}/> 
        {/* {basket.length > 0 && ( */}
          <BasketComponent basket={basket} removeItemFromBasket={removePetFromBasket} 
            sorting = {compareIdAsc}/>
        {/* )} */}
      </div>
      </>
    );
  }
}

export default App;
