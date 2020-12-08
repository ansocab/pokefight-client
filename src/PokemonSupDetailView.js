import React, { useState, useEffect } from "react";

export default function PokemonSupDetailedView() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    getSupDetailedViewPokefighten();
  }, []);

  //const handleChange =(e)=>{
  //    setQuery(e.target.value)

  const getSupDetailedViewPokefighten = () => {
    fetch(`https://pokefighten.herokuapp.com/pokemon`)
      .then((response) => response.json())
      .then((response) => {
        setPokemon(response);
        console.log(response);
      });
  };

  return (
    <div>
      <ul>
        {pokemon.map((item) => (
          <div>
            <li>Pokemon id {item.id}</li>
            <li>Pokemon name {item.name.english}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
