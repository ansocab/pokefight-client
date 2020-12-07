import React from "react";
import "./App.css";

export default function PokemonCard(props) {
  return (
    <div className="Pokemonclass">
      <div className="PokemonTop">{props.name}</div>
      <div className="PokemonMid">{props.img}</div>
      <div className="PokemonBottom">{props.type}</div>
    </div>
  );
}
