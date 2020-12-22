import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandScissors,
    faHandPaper,
    faHandRock,
} from "@fortawesome/free-regular-svg-icons";
import "../App.css";

export default function GameButton({callback}) {
      const selectWeapon = (e) => {
       callback(e.target.name)
      };

  return (
    <div className="weaponBtn-wrapper">
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
    </div>
  );
}
