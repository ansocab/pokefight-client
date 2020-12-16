import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "./PokemonCard";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getDataFromPokefighten();
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const getDataFromPokefighten = () => {
    fetch(`https://pokefighten.herokuapp.com/pokemon`)
      .then((response) => response.json())
      .then((response) => {
        setPokemon(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="textf">POKEFIGHT ! </div>
      <Link to="/leaderboard" className="leaderboard-button-link">
        Leaderboard
      </Link>
      <h1 className="texta">Select the pokemon you want to fight with!</h1>
      <input
      className="search-input-field"
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Search Pokedex"
      />
      <ul className="cardList">
        {pokemon
          .filter((p) => p.name.english.toLowerCase().includes(filter.toLowerCase()))
          .map((item) => (
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
