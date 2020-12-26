import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../cardColors.css";

export default function PokemonCard(props) {
  // const ConditionalWrapper = ({ condition, wrapper, children }) => condition ? wrapper(children) : children;
  // <ConditionalWrapper condition={(props.origin === "list")} wrapper={children => <Link to={`fight/${props.id}`}>{children}</Link>}>

  return (
    <div className="card-wrapper-main">
      <div
        className={`Pokemonclass Pokemonclass--${props.type[0]} pokemoncard`}
      >
        <Link to={`fight/${props.id}`}>
          <div className="card__image-container">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`}
              alt={props.name.english}
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
        </Link>
      </div>
    </div>
  );
}
