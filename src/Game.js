import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PokemonCard from "./PokemonCard";

export default function Game() {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getOnePokemon();
  }, []);

  const getOnePokemon = () => {
    fetch(`https://pokefighten.herokuapp.com/pokemon/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setPokemon(response);
        setLoading(false);
      });
  };

  if (loading) {
    return <div className="spinner"></div>;
  } else {
    return (
      <div>
        <ul>
          <PokemonCard
            id={pokemon.id}
            name={pokemon.name}
            type={pokemon.type}
            base={pokemon.base}
            origin="game"
          />
        </ul>
      </div>
    );
  }
}
