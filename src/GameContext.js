import React, { createContext, useState } from "react";

const GameContext = createContext({ name: "", auth: false });
const GameProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [gameText, setGameText] = useState("");
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

  return (
    <GameContext.Provider value={{ gameText, updateGameText, playersChoice, setPlayersChoice, computersChoice, setComputersChoice }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
