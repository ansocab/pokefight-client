import React, { useState, useEffect, useContext, useRef } from "react";
import { GameContext } from "../GameContext";
import { useHistory, useParams } from "react-router-dom";
import PokemonGamecard from "./PokemonGamecard";
import VantaFog from "./VantaFog";
import GameTextbox from "./GameTextbox";
import GameButtons from "./GameButtons";
import ProgressBar from "./ProgressBar";

export default function Game() {
  const {
    updateGameText,
    setComputersChoice,
    playersChoice,
    computersChoice,
  } = useContext(GameContext);
  const [pokemonOne, setPokemonOne] = useState({});
  const [pokemonTwo, setPokemonTwo] = useState({});
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomId, setRandomId] = useState(Math.floor(Math.random() * 809));
  const [showButtons, setShowButtons] = useState(true);
  const [showTextfield, setShowTextfield] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const gamecardRefOne = useRef();
  const gamecardRefTwo = useRef();

  const [playersHp, setPlayersHp] = useState([]);
  const [playersHpPercentage, setPlayersHpPercentage] = useState([100, 100]);
  const [winCounter, setWinCounter] = useState(0);
  let current_attacking_player = 0;
  let current_defending_player = 1;
  let players = [];
  let playersDamage = [];
  let playersDamageMessages = [];
  let gameData = {};

  // FETCH POKEMON (get request) AND GAME RESULT (post request)
  const getPokemonOne = fetch(`https://pokefightv2.herokuapp.com/pokemon/${id}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  const getPokemonTwo = fetch(
    `https://pokefightv2.herokuapp.com/pokemon/${randomId}`
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));

  const getTypeData = fetch(`https://pokefightv2.herokuapp.com/type`)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  useEffect(() => {
    setRandomId(Math.floor(Math.random() * 809));
    Promise.all([getPokemonOne, getPokemonTwo, getTypeData]).then((values) => {
      setPokemonOne(values[0]);
      setPokemonTwo(values[1]);
      setTypes(values[2]);
      setPlayersHp([values[0].base.HP, values[1].base.HP]);
      setPlayersHpPercentage([100, 100]);
      setLoading(false);
    });
  }, [winCounter]);

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
  if (!loading) {
    players = [pokemonOne, pokemonTwo];

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
      return "The attack was not very effective...";
    } else if (damageDegree > 0.5) {
      return "The attack was super effective!";
    } else {
      return "The attack was successful";
    }
  }

  function pause(secs) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), secs);
    });
  }

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

  const flipCards = () => {
    gamecardRefOne.current.flipCard();
    gamecardRefTwo.current.flipCard();
  };

  const rockPaperScissors = async (pChoice) => {
    const cChoice = getSign(Math.floor(Math.random() * 3));
    setComputersChoice(cChoice);
    flipCards();
    console.log("Players choice: " + pChoice);
    console.log(`Computers choice: ${cChoice}`);

    setShowButtons(false);

    if (pChoice === cChoice) {
      console.log("It's a tie!");
      setShowButtons(false);
      setShowTextfield(true);
      updateGameText("It's a tie!");
      await pause(2000);
      setShowTextfield(false);
      setShowButtons(true);
      flipCards();
    } else if (
      (pChoice === "rock" && cChoice === "scissors") ||
      (pChoice === "scissors" && cChoice === "paper") ||
      (pChoice === "paper" && cChoice === "rock")
    ) {
      console.log("You won the round!");
      current_attacking_player = 0;
      current_defending_player = 1;
      await pause(2000);
      flipCards();
      attack();
    } else {
      console.log("You lost the round!");
      current_attacking_player = 1;
      current_defending_player = 0;
      await pause(2000);
      flipCards();
      attack();
    }
  };

  const attack = async () => {
    // computation and setting of attack, HP values etc.
    console.log(playersDamage[current_attacking_player]);
    setShowTextfield(true);
    updateGameText(playersDamageMessages[current_attacking_player]);
    let newHpDefendingPlayer;
    let newPercentageDefendingPlayer;

    if (
      Math.floor(Math.random() * 200) <
      players[current_attacking_player].base.Speed
    ) {
      newHpDefendingPlayer = Math.floor(
        playersHp[current_defending_player] -
          players[current_attacking_player].base.Attack *
            playersDamage[current_attacking_player] *
            2
      );
      console.log(newHpDefendingPlayer);
      await pause(2000);
      updateGameText("It was so fast, it attacked twice!");
    } else {
      newHpDefendingPlayer = Math.floor(
        playersHp[current_defending_player] -
          players[current_attacking_player].base.Attack *
            playersDamage[current_attacking_player]
      );
    }

    if (newHpDefendingPlayer < 0) {
      newHpDefendingPlayer = 0;
    }

    setPlayersHp(
      playersHp.map((hp, index) => [
        index === current_defending_player ? newHpDefendingPlayer : hp,
      ])
    );

    newPercentageDefendingPlayer =
      (newHpDefendingPlayer / players[current_defending_player].base.HP) * 100;

    setPlayersHpPercentage(
      playersHpPercentage.map((percentage, index) => [
        index === current_defending_player
          ? newPercentageDefendingPlayer
          : percentage,
      ])
    );

    await pause(2000);

    if (newHpDefendingPlayer <= 0) {
      let gameResult = players[current_attacking_player].name.english;
      updateGameText(`${gameResult} wins!`);

      if (gameResult === pokemonOne.name.english) {
        await pause(2000);
        setWinCounter(winCounter + 1);
        setShowTextfield(false);
        setShowButtons(true);
      } else {
        history.push("/leaderboard");
      }

      gameData = {
        pokemon_one: pokemonOne.name.english,
        pokemon_two: pokemonTwo.name.english,
        number_of_rounds: 5,
        result: gameResult,
      };
      //sendGameResult();
    } else {
      setShowTextfield(false);
      setShowButtons(true);
      console.log(
        "defending: " +
          newHpDefendingPlayer +
          " " +
          "attacking: " +
          playersHp[current_attacking_player]
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
        <ul className="cardList">
          <PokemonGamecard
            id={pokemonOne.id}
            name={pokemonOne.name}
            type={pokemonOne.type}
            base={pokemonOne.base}
            ref={gamecardRefOne}
            choice={playersChoice}
            // origin="game"
          />
          {showButtons === true && <GameButtons callback={rockPaperScissors} />}
          {showTextfield === true && <GameTextbox />}
          <PokemonGamecard
            id={pokemonTwo.id}
            name={pokemonTwo.name}
            type={pokemonTwo.type}
            base={pokemonTwo.base}
            ref={gamecardRefTwo}
            choice={computersChoice}
            // origin="game"
          />
        </ul>
        <ul className="cardList">
          <ProgressBar completed={playersHpPercentage[0]} />
          <div className="game-textfield">{`Pokemon defeated: ${winCounter}`}</div>
          <ProgressBar completed={playersHpPercentage[1]} />
        </ul>
      </div>
    );
  }
}
