import React, { useContext } from "react";
import { GameContext } from "../GameContext";

import "../App.css";

export default function GameTextbox() {
  const { gameText } = useContext(GameContext);
  return (
    <div id="logger" className="game-textfield">
      <p>{gameText}</p>
      {/* {gameText.map((str, index) => (
        <p key={index}> {str}</p>
      ))} */}
    </div>
  );
}
