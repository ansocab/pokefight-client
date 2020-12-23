import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSpring, animated as a } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandScissors as scissors,
  faHandPaper as paper,
  faHandRock as rock,
} from "@fortawesome/free-regular-svg-icons";
import "../App.css";
import "../cardColors.css";

const PokemonGamecard = forwardRef((props, ref) => {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useImperativeHandle(ref, (choice) => ({
    flipCard() {
      set((state) => !state);
    },
  }));

  return (
    <div className="card-wrapper">
      <a.div
        className={`Pokemonclass Pokemonclass--${props.type[0]} pokemon-gamecard`}
        style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
      >
        <div className="card__image-container">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`}
            alt="Eevee"
            className="card__image"
          />
        </div>
        <figcaption className="card__caption">
          <h1 className="card__name">{props.name.english}</h1>
          <h3 className="card__type">{props.type.join("-")}</h3>
          <table className="card__stats">
            <tbody>
              <tr>
                <th>HP</th>
                <td>{props.base.HP}</td>
              </tr>
              <tr>
                <th>Attack</th>
                <td>{props.base.Attack}</td>
              </tr>
              <tr>
                <th>Defense</th>
                <td>{props.base.Defense}</td>
              </tr>
              <tr>
                <th>Speed</th>
                <td>{props.base.Speed}</td>
              </tr>
            </tbody>
          </table>
        </figcaption>
      </a.div>

      <a.div
        className={`Pokemonclass Pokemonclass--${props.type[0]} pokemon-gamecard back`}
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateY(180deg)`),
        }}
      >
        {/* <FontAwesomeIcon className="fight-icon" icon={`props.choice`} /> */}
        <FontAwesomeIcon className="fight-icon card-icon" icon={props.choice === "rock" ? rock : props.choice === "paper" ? paper : scissors} />
      </a.div>
    </div>
  );
});

export default PokemonGamecard;
