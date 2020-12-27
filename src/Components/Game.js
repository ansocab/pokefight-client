import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GameContext } from "../GameContext";
import PokemonGamecard from "./PokemonGamecard";
import VantaFog from "./VantaFog";
import GameTextbox from "./GameTextbox";
import GameButtons from "./GameButtons";
import ProgressBar from "./ProgressBar";
import mew from "../assets/mew.gif";

export default function Game() {
  const {
    updateGameText,
    setComputersChoice,
    playersChoice,
    computersChoice,
    setPhase,
  } = useContext(GameContext);
  const [pokemonOne, setPokemonOne] = useState({});
  const [pokemonTwo, setPokemonTwo] = useState({});
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomId, setRandomId] = useState(Math.floor(Math.random() * 809));
  const [showButtons, setShowButtons] = useState(false);
  const [showTextfield, setShowTextfield] = useState(true);
  const [showGameEndButtons, setShowGameEndButtons] = useState(false);
  const [showLeaderboardSubmit, setShowLeaderboardSubmit] = useState(false);
  const [postRequestData, setPostRequestData] = useState({});
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
    let mounted = true;
    setRandomId(Math.floor(Math.random() * 809));
    Promise.all([getPokemonOne, getPokemonTwo, getTypeData]).then((values) => {
      if (mounted) {
        setPokemonOne(values[0]);
        setPokemonTwo(values[1]);
        setTypes(values[2]);
        setPlayersHp([values[0].base.HP, values[1].base.HP]);
        setPlayersHpPercentage([100, 100]);
        setLoading(false);
        setupGame(values[1].name.english);
      }
    });
    return () => (mounted = false);
  }, [winCounter]);

  const sendGameResult = (gameData) => {
    console.log(gameData);
    fetch(`https://pokefightv2.herokuapp.com/game/save`, {
      method: "POST",
      body: JSON.stringify(gameData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        handleRedirect(res);
      })
      .catch((err) => console.log(err));
  };

  function handleRedirect(res) {
    if (res.status === 200) {
      history.push("/leaderboard");
    } else {
      console.log("something went wrong");
    }
  }

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

  async function setupGame(pokTwoName) {
    await pause(2500);
    if (gamecardRefTwo.current) {
      gamecardRefTwo.current.flipCard();
    }
    updateGameText(`${pokTwoName}!`);
    await pause(2500);
    updateGameText("FIGHT!");
    await pause(2500);
    setShowTextfield(false);
    setShowButtons(true);
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
    setPhase("fight");
    const cChoice = getSign(Math.floor(Math.random() * 3));
    setComputersChoice(cChoice);

    flipCards();
    setShowButtons(false);
    setShowTextfield(true);

    if (pChoice === cChoice) {
      updateGameText("It's a tie!");
      await pause(2500);
      setShowTextfield(false);
      setShowButtons(true);
      flipCards();
    } else if (
      (pChoice === "rock" && cChoice === "scissors") ||
      (pChoice === "scissors" && cChoice === "paper") ||
      (pChoice === "paper" && cChoice === "rock")
    ) {
      current_attacking_player = 0;
      current_defending_player = 1;
      updateGameText(
        `${players[current_attacking_player].name.english} is attacking...`
      );
      await pause(2500);
      flipCards();
      attack();
    } else {
      current_attacking_player = 1;
      current_defending_player = 0;
      updateGameText(
        `${players[current_attacking_player].name.english} is attacking...`
      );
      await pause(2500);
      flipCards();
      attack();
    }
  };

  const attack = async () => {
    // computation and setting of attack, HP values etc.
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
      await pause(2500);
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

    await pause(2500);

    if (newHpDefendingPlayer <= 0) {
      let gameResult = players[current_attacking_player].name.english;
      updateGameText(`${gameResult} wins!`);

      if (gameResult === pokemonOne.name.english) {
        await pause(2500);
        setPhase("prep");
        gamecardRefTwo.current.flipCard();
        setWinCounter(winCounter + 1);
        updateGameText("The next pokemon is...");
      } else {
        updateGameText(
          `${players[current_defending_player].name.english} looses!`
        );
        await pause(2500);
        updateGameText("GAME OVER!");
        await pause(2500);
        setShowTextfield(false);
        setShowGameEndButtons(true);
      }
    } else {
      setShowTextfield(false);
      setShowButtons(true);
    }
  };

  const handleLeaderboardSubmission = () => {
    setShowLeaderboardSubmit(true);
    if (winCounter === 1) {
      updateGameText(
        `You won ${winCounter} match with ${pokemonOne.name.english}`
      );
    } else {
      updateGameText(
        `You won ${winCounter} matches with ${pokemonOne.name.english}`
      );
    }
  };

  const prepareLbData = (userName) => {
    const gameData = {
      name: userName,
      pokemon: pokemonOne.name.english,
      defeated_pokemon: winCounter,
    };
    sendGameResult(gameData);
  };

  // RENDER
  return (
    <div className="game-wrapper-helper">
      <div className="game-wrapper">
        <VantaFog />
        {loading ? (
          <img
            src={mew}
            alt="loading mew gif"
            style={{ margin: "250px 0", height: "100px", width: "auto" }}
          />
        ) : (
          <>
            <ul className="cardList">
              <PokemonGamecard
                id={pokemonOne.id}
                name={pokemonOne.name}
                type={pokemonOne.type}
                base={pokemonOne.base}
                ref={gamecardRefOne}
                choice={playersChoice}
                position="left"
                // origin="game"
              />
              {showButtons === true && (
                <GameButtons callback={rockPaperScissors} />
              )}
              {showTextfield === true && (
                <GameTextbox
                  showInput={showLeaderboardSubmit}
                  handleSubmit={prepareLbData}
                />
              )}
              {showGameEndButtons === true && (
                  <div className="game-end-btn-wrapper">
                    <button
                      className="game-end-btn"
                      onClick={handleLeaderboardSubmission}
                    >
                      {"Submit"}
                    </button>
                    <button
                      className="game-end-btn"
                      onClick={() => history.push("/")}
                    >
                      Play again
                    </button>
                  </div>
                )}
              <PokemonGamecard
                id={pokemonTwo.id}
                name={pokemonTwo.name}
                type={pokemonTwo.type}
                base={pokemonTwo.base}
                ref={gamecardRefTwo}
                choice={computersChoice}
                position="right"
                // origin="game"
              />
            </ul>
            <ul className="status-wrapper">
              <ProgressBar completed={playersHpPercentage[0]} />
              <div className="helper-wrapper">
                {/* {showGameEndButtons ? (
                  <div className="game-end-btn-wrapper">
                    <button
                      className="game-end-btn"
                      onClick={handleLeaderboardSubmission}
                    >
                      {"Submit"}
                    </button>
                    <button
                      className="game-end-btn"
                      onClick={() => history.push("/")}
                    >
                      Play again
                    </button>
                  </div>
                ) : ( */}
                  <div className="game-textfield">{`Pokemon defeated: ${winCounter}`}</div>
                
              </div>
              <ProgressBar completed={playersHpPercentage[1]} />
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
