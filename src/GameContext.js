import React, { createContext, useState } from "react";

const GameContext = createContext({ name: "", auth: false });
const GameProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [gameText, setGameText] = useState(["READY TO FIGHT !"]);
  const updateGameText = (newValue) => {
    if(newValue === "reset") {
      setGameText(["READY TO FIGHT !"])
    } else {
      setGameText((prev) => [...prev, newValue]);
    }
  };
  return (
    <GameContext.Provider value={{ gameText, updateGameText }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
