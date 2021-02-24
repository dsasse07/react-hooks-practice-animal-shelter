import React from "react";

import Pet from "./Pet";

function PetBrowser( { pets, onAdoptPet }) {

  const petComponents = pets.map( ({id, type, gender, age, weight, name, isAdopted}) =>{
    return (
      <Pet 
        key={id}
        id={id}
        type={type}
        gender={gender}
        age={age}
        weight={weight}
        name={name}
        isAdopted={isAdopted}
        onAdoptPet={onAdoptPet} 
      />
    )
  })

  return (
    <div className="ui cards">
      {petComponents}
    </div>
    )
}

export default PetBrowser;
