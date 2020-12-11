import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";
import { useParams } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import VantaFog from "./VantaFog";
import Header from "./Header.js";

export default function Game() {
  const { updateGameText } = useContext(GameContext);
  const [pokemonOne, setPokemonOne] = useState({});
  const [pokemonTwo, setPokemonTwo] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const randomId = Math.floor(Math.random() * 809);

  // FETCH POKEMON (get request) AND GAME RESULT (post request)
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
      })
      .catch((err) => console.log(err));
  };

  const getPokemonTwo = () => {
    fetch(`https://pokefighten.herokuapp.com/pokemon/${randomId}`)
      .then((response) => response.json())
      .then((response) => {
        setPokemonTwo(response);
      })
      .catch((err) => console.log(err));
  };

  const sendGameResult = () => {
    fetch(`https://pokefighten.herokuapp.com/game/save`, {
      method: "POST",
      body: JSON.stringify(gameData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //GAME LOGIC
  let current_attacking_player = 0;
  let current_defending_player = 1;
  let turns_left = 10;
  let players = [];
  let gameData = {};

  if (!loading) {
    if (pokemonOne.base.Speed >= pokemonTwo.base.Speed) {
      players = [
        JSON.parse(JSON.stringify(pokemonOne)),
        JSON.parse(JSON.stringify(pokemonTwo)),
      ];
    } else {
      players = [
        JSON.parse(JSON.stringify(pokemonTwo)),
        JSON.parse(JSON.stringify(pokemonOne)),
      ];
    }
  }

  function fakeAnimationPause() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 2000);
    });
  }

  const attack = async () => {
    if (
      turns_left > 0 &&
      players[current_defending_player].base.HP > 0 &&
      players[current_attacking_player].base.HP > 0
    ) {
      // computation and setting of attack, HP values etc.
      players[current_defending_player].base.HP =
        players[current_defending_player].base.HP +
        players[current_defending_player].base.Defense -
        players[current_attacking_player].base.Attack;

      // take a break for animation
      await fakeAnimationPause();
      updateGameText(
        `${players[current_attacking_player].name.english} is attacking with power of ${players[current_attacking_player].base.Attack}`
      );
      updateGameText(
        `HP ${players[current_defending_player].name.english}: ${players[current_defending_player].base.HP}`
      );

      // update game conditions
      turns_left--;
      current_attacking_player = current_attacking_player === 0 ? 1 : 0;
      current_defending_player = current_attacking_player === 0 ? 1 : 0;
      attack();
    } else {
      let gameResult;

      if (turns_left === 0) {
        gameResult = "tie";
        updateGameText("It's a tie!");
      } else {
        gameResult =
          players[current_attacking_player].base.HP > 0
            ? players[current_attacking_player].name.english
            : players[current_defending_player].name.english;
        updateGameText(`${gameResult} wins!`);
      }

      gameData = {
        pokemon_one: pokemonOne.name.english,
        pokemon_two: pokemonTwo.name.english,
        number_of_rounds: Math.ceil((10 - turns_left) / 2),
        result: gameResult,
      };
      sendGameResult();
    }
  };

  // RENDER
  if (loading) {
    return <div className="spinner"></div>;
  } else {
    return (
      <div>
        <VantaFog />
        <Header />
        <button className="fight-button" onClick={attack}>
          START FIGHT
        </button>

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
