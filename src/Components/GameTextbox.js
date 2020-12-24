import React, { useContext, useState } from "react";
import { GameContext } from "../GameContext";

import "../App.css";

export default function GameTextbox({ showInput, handleSubmit }) {
  const { gameText } = useContext(GameContext);
  const [inputValue, setinputValue] = useState("");

  const handleChange = (e) => {
    setinputValue(e.target.value)
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    handleSubmit(inputValue)
  }

  return (
    <div id="logger" className="game-textfield">
      <p>{gameText}</p>
      {showInput === true && (
        <form onSubmit={handleSubmission}>
          <input type="text" placeholder="Your name" value={inputValue} onChange={handleChange} />
          <input type="submit" value="Submit" />
        </form>
      )}
      {/* {gameText.map((str, index) => (
        <p key={index}> {str}</p>
      ))} */}
    </div>
  );
}
