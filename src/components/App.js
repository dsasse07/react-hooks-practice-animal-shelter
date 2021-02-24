import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const petsURL = "http://localhost:3001/pets"
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function fetchPets( filterParams ){
    return fetch( `${petsURL}${filterParams}`)
    .then( response => response.json() )
  }

  function patchPet(id, patchConfig){
    return fetch( `${petsURL}/${id}`, patchConfig)
    .then( response => response.json() )
  }

  function handleChangeFilter(event){
    const value = event.target.value    
    setFilters({type: value})
  }

  function handleFindPets(){
    const {type} = filters
    console.log('type', type)
    const filterParams = (type !== "all") ? `?type=${type}` : ""
    fetchPets( filterParams ).then( petData => setPets(petData))
  }
  
  function handleAdoptPet(id){
    const patchPetConfig = {
      method: "PATCH",
      headers: {"Content-type":"application/json"},
      body: JSON.stringify( {isAdopted: true})
    }
    patchPet(id, patchPetConfig).then( petData => updatePets(petData) )
  }

  function updatePets(petData){
    const newPetArray = pets.map( pet => {
      if (pet.id !== petData.id) return pet
      return {...petData}
    } )
    setPets(newPetArray)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters filters={filters} onChangeType={handleChangeFilter} onFindPetsClick={handleFindPets}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
