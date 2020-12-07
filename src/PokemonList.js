import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    getDataFromPokefighten();
  }, []);

  //const handleChange =(e)=>{
  //    setQuery(e.target.value)

  const getDataFromPokefighten = () => {
    fetch(`https://pokefighten.herokuapp.com/pokemon`)
      .then((response) => response.json())
      .then((response) => {
        setPokemon(response);
        console.log(response);
      });
  };

  return (
    <div>
      <ul className="cardList">
        {pokemon.map((item) => (
          <PokemonCard
            id={item.id}
            name={item.name.english}
            type={item.type[0]}
          />
        ))}
      </ul>
    </div>
  );
}
