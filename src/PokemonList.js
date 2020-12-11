import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Link to="/leaderboard"><button className="leaderboard-button">Leaderboard</button></Link>
      <h1>Select the pokemon you want to fight with!</h1>
      <ul className="cardList">
        {pokemon.map((item) => (
          <PokemonCard
            id={item.id}
            name={item.name}
            type={item.type}
            base={item.base}
            origin="list"
          />
        ))}
      </ul>
    </div>
  );
}
