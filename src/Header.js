import React, { useContext } from "react";
import { GameContext } from "./GameContext";

import "./App.css";

export default function Header() {
  const { gameText } = useContext(GameContext);
  console.log(gameText);
  return (
    <div id="logger" className="results">
      {gameText.map((str) => (
        <p> {str}</p>
      ))}
    </div>
  );
}
