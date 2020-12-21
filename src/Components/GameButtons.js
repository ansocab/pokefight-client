import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandScissors,
    faHandPaper,
    faHandRock,
} from "@fortawesome/free-regular-svg-icons";
import "../App.css";

export default function GameButton({callback}) {
    const [playersChoice, setPlayersChoice] = useState("");

    useEffect(() => {
        if (playersChoice !== "") {
          callback(playersChoice)
        }
      }, [playersChoice]);

      const selectWeapon = (e) => {
        //console.log("Players choice: " + e.target.name);
        //setPlayersChoice("");
        setPlayersChoice(e.target.name);
      };
    

  return (
    <>
      <div>
        <button className="weaponBtn" name="rock" onClick={selectWeapon}>
          <FontAwesomeIcon
            pointerEvents={"none"}
            className="fight-icon"
            icon={faHandRock}
          />
        </button>
      </div>
      <div>
        <button className="weaponBtn" name="paper" onClick={selectWeapon}>
          <FontAwesomeIcon className="fight-icon" icon={faHandPaper} />
        </button>
        <button className="weaponBtn" name="scissors" onClick={selectWeapon}>
          <FontAwesomeIcon className="fight-icon" icon={faHandScissors} />
        </button>
      </div>
    </>
  );
}
