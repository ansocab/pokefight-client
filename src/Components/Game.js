import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "../GameContext";
import { useParams } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import VantaFog from "./VantaFog";
import Header from "./Header";
import GameButtons from "./GameButtons";

export default function Game() {
  const { updateGameText } = useContext(GameContext);
  const [pokemonOne, setPokemonOne] = useState({});
  const [pokemonTwo, setPokemonTwo] = useState({});
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // FETCH POKEMON (get request) AND GAME RESULT (post request)
    const getPokemonOne = 
      fetch(`https://pokefightv2.herokuapp.com/pokemon/${id}`)
        .then((response) => response.json())
        .catch((err) => console.log(err));

    const randomId = Math.floor(Math.random() * 809);
    const getPokemonTwo = 
      fetch(`https://pokefightv2.herokuapp.com/pokemon/${randomId}`)
        .then((response) => response.json())
        .catch((err) => console.log(err));

    const getTypeData = 
      fetch(`https://pokefightv2.herokuapp.com/type`)
        .then((response) => response.json())
        .catch((err) => console.log(err));


    useEffect(() => {
      Promise.all([getPokemonOne, getPokemonTwo, getTypeData]).then((values) => {
        console.log(values)
        setPokemonOne(values[0]);
        setPokemonTwo(values[1]);
        setTypes(values[2]);
        setLoading(false);
      });
    }, [])

  const sendGameResult = () => {
    fetch(`https://pokefightv2.herokuapp.com/game/save`, {
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
  let players = [];
  let playersDamage = [];
  let playersDamageMessages = [];
  let gameData = {};

  if (!loading) {
    players = [
      JSON.parse(JSON.stringify(pokemonOne)),
      JSON.parse(JSON.stringify(pokemonTwo)),
    ];

    let pOneTypes = [];
    pokemonOne.type.forEach((pOneType) => {
      pOneTypes.push(types.find((t) => t.name === pOneType.toLowerCase()));
    });

    let pTwoTypes = [];
    pokemonTwo.type.forEach((pTwoType) => {
      pTwoTypes.push(types.find((t) => t.name === pTwoType.toLowerCase()));
    });
    playersDamage = [
      getDamageMultiplier(pOneTypes, pokemonTwo.type),
      getDamageMultiplier(pTwoTypes, pokemonOne.type),
    ];

    playersDamageMessages = [
      getDamageMessage(playersDamage[0]),
      getDamageMessage(playersDamage[1]),
    ];
  }

  function getDamageMultiplier(typesOfAttacking, typesOfDefending) {
    let damageDegree = 0.5;
    typesOfAttacking.forEach((atype) => {
      typesOfDefending.forEach((dtype) => {
        if (atype.double_damage_to.includes(dtype.toLowerCase())) {
          damageDegree += 0.5;
        } else if (atype.half_damage_to.includes(dtype.toLowerCase())) {
          damageDegree -= 0.25;
        } else if (atype.no_damage_to.includes(dtype.toLowerCase())) {
          damageDegree -= 0.4;
        }
      });
    });

    if (damageDegree <= 0) {
      damageDegree = 0.1;
    }
    return damageDegree;
  }

  function getDamageMessage(damageDegree) {
    if (damageDegree < 0.5) {
      return "The attack was not very effective";
    } else if (damageDegree > 0.5) {
      return "The attack was super effective";
    } else {
      return "The attack was successful";
    }
  }

  // const selectWeapon = (e) => {
  //   //console.log("Players choice: " + e.target.name);
  //   setPlayersChoice("");
  //   setPlayersChoice(e.target.name);
  // };

  // useEffect(() => {
  //   if (playersChoice !== "") {

  //     rockPaperScissors();
  //   }
  // }, [playersChoice]);

  function fakeAnimationPause() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 2000);
    });
  }

  // const startFight = () => {
  //   updateGameText("reset");
  //   rockPaperScissors();
  // };

  const getSign = (number) => {
    switch (number) {
      case 0:
        return "rock";
      case 1:
        return "paper";
      case 2:
        return "scissors";
      default:
        return;
    }
  };

  const rockPaperScissors = (playersChoice) => {
    // updateGameText("reset");
    const computersChoice = getSign(Math.floor(Math.random() * 3));
    console.log("Players choice: " + playersChoice);
    console.log(`Computers choice: ${computersChoice}`);

    if (playersChoice === computersChoice) {
      console.log("It's a tie!");
      //rockPaperScissors();
    } else if (
      (playersChoice === "rock" && computersChoice === "scissors") ||
      (playersChoice === "scissors" && computersChoice === "paper") ||
      (playersChoice === "paper" && computersChoice === "rock")
    ) {
      console.log("You won the round!");
      current_attacking_player = 0;
      current_defending_player = 1;
      attack();
    } else {
      console.log("You lost the round!");
      current_attacking_player = 1;
      current_defending_player = 0;
      attack();
    }
  };

  const attack = async () => {
    // computation and setting of attack, HP values etc.
    updateGameText(playersDamageMessages[current_attacking_player]);
    if (
      Math.floor(Math.random() * 100) <
      players[current_attacking_player].base.Speed
    ) {
      players[current_defending_player].base.HP =
        players[current_defending_player].base.HP -
        players[current_attacking_player].base.Attack *
          playersDamage[current_attacking_player] *
          2;
      updateGameText("It was so fast, it attacked twice!");
    } else {
      players[current_defending_player].base.HP =
        players[current_defending_player].base.HP -
        players[current_attacking_player].base.Attack *
          playersDamage[current_attacking_player];
    }

    // take a break for animation
    await fakeAnimationPause();

    updateGameText(
      `HP ${players[current_defending_player].name.english}: ${players[current_defending_player].base.HP}`
    );

    // update game conditions

    if (
      players[current_defending_player].base.HP <= 0 ||
      players[current_attacking_player].base.HP <= 0
    ) {
      let gameResult =
        players[current_attacking_player].base.HP > 0
          ? players[current_attacking_player].name.english
          : players[current_defending_player].name.english;
      updateGameText(`${gameResult} wins!`);

      gameData = {
        pokemon_one: pokemonOne.name.english,
        pokemon_two: pokemonTwo.name.english,
        number_of_rounds: 5,
        result: gameResult,
      };
      //sendGameResult();
    } else {
      console.log(
        "defending: " +
          players[current_defending_player].base.HP + " " +
          "attacking: " +
          players[current_attacking_player].base.HP
      );
    }
  };

  // RENDER
  if (loading) {
    return <div className="spinner"></div>;
  } else {
    return (
      <div className="game-wrapper">
        <VantaFog />
        <Header />
        <ul className="cardList">
          <PokemonCard
            id={pokemonOne.id}
            name={pokemonOne.name}
            type={pokemonOne.type}
            base={pokemonOne.base}
            origin="game"
          />
          <GameButtons callback={rockPaperScissors} />
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
