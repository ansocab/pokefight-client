import React, { createContext, useState } from "react";

const GameContext = createContext({ name: "", auth: false });
const GameProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [gameText, setGameText] = useState("You're figthing against...");
  const updateGameText = (newValue) => {
    setGameText(newValue);
  };
  // const updateGameText = (newValue) => {
  //   if(newValue === "reset") {
  //     setGameText([])
  //   } else {
  //     setGameText([(prev) => [...prev, newValue]]);
  //   }
  //};
  const [playersChoice, setPlayersChoice] = useState("rock");
  const [computersChoice, setComputersChoice] = useState("rock");
  const [phase, setPhase] = useState("prep");

  return (
    <GameContext.Provider
      value={{
        gameText,
        updateGameText,
        playersChoice,
        setPlayersChoice,
        computersChoice,
        setComputersChoice,
        phase,
        setPhase,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
