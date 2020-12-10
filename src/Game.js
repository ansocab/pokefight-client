import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import VantaFog from "./VantaFog";

export default function Game() {
  const [pokemonOne, setPokemonOne] = useState({});
  const [pokemonTwo, setPokemonTwo] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  let gameData = {};

  const randomId = Math.floor(Math.random() * 809);

  useEffect(() => {
    if (
      typeof pokemonOne.name !== "undefined" &&
      typeof pokemonTwo.name !== "undefined"
    ) {
      setLoading(false);
    }
  }, [pokemonOne, pokemonTwo]);

  useEffect(() => {
    getPokemonOne();
    getPokemonTwo();
  }, []);

  const getPokemonOne = () => {
    fetch(`https://pokefighten.herokuapp.com/pokemon/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setPokemonOne(response);
      });
  };

  const getPokemonTwo = () => {
    fetch(`https://pokefighten.herokuapp.com/pokemon/${randomId}`)
      .then((response) => response.json())
      .then((response) => {
        setPokemonTwo(response);
      });
  };

   const fight = () => {
     let pokemonLowerSpeed = {};
     let pokemonHigherSpeed = {};
     let counter = 0;
    
    if(pokemonOne.base.Speed >= pokemonTwo.base.Speed) {
      pokemonHigherSpeed = JSON.parse(JSON.stringify(pokemonOne));
      pokemonLowerSpeed = JSON.parse(JSON.stringify(pokemonTwo));
    } else {
      pokemonHigherSpeed = JSON.parse(JSON.stringify(pokemonTwo));
      pokemonLowerSpeed = JSON.parse(JSON.stringify(pokemonOne));
    }

    do {
      pokemonLowerSpeed.base.HP =
        pokemonLowerSpeed.base.HP + pokemonLowerSpeed.base.Defense - pokemonHigherSpeed.base.Attack;
      console.log(`HP ${pokemonLowerSpeed.name.english}: ${pokemonLowerSpeed.base.HP}`);
      if (pokemonLowerSpeed.base.HP <= 0) {
        console.log(`${pokemonHigherSpeed.name.english} has won the game!`);
        gameData = {pokemon_one: pokemonOne, pokemon_two: pokemonTwo, number_of_rounds: counter+1, result: pokemonHigherSpeed.name.english}
        break;
      }
      pokemonHigherSpeed.base.HP =
        pokemonHigherSpeed.base.HP + pokemonHigherSpeed.base.Defense - pokemonLowerSpeed.base.Attack;
      console.log(`HP ${pokemonHigherSpeed.name.english}: ${pokemonHigherSpeed.base.HP}`);
      if (pokemonHigherSpeed.base.HP <= 0) {
        console.log(`${pokemonLowerSpeed.name.english} has won the game!`);
        gameData = {pokemon_one: pokemonOne, pokemon_two: pokemonTwo, number_of_rounds: counter+1, result: pokemonLowerSpeed.name.english}
        break;
      }

      if (counter === 9) {
        console.log("It's a tie!");
        gameData = {pokemon_one: pokemonOne, pokemon_two: pokemonTwo, number_of_rounds: counter+1, result: "tie"}
        break;
      }
      counter++;

    } while (pokemonHigherSpeed.base.HP > 0 && pokemonLowerSpeed.base.HP > 0);
    
    console.log(gameData)
  };

  if (loading) {
    return <div className="spinner"></div>;
  } else {
    return (
      <div>
        <button className="fight-button" onClick={fight}>
          START FIGHT
        </button>
        <VantaFog />
        <ul>
          <PokemonCard
            id={pokemonOne.id}
            name={pokemonOne.name}
            type={pokemonOne.type}
            base={pokemonOne.base}
            origin="game"
          />
          <PokemonCard
            id={pokemonTwo.id}
            name={pokemonTwo.name}
            type={pokemonTwo.type}
            base={pokemonTwo.base}
            origin="game"
          />
        </ul>
      </div>
    );
  }
}
