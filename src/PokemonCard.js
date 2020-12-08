import React from "react";
import "./App.css";

export default function PokemonCard(props, key) {
  return (
    
    <div className="Pokemonclass">
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
              <th>Special Attack</th>
              <td>{props.base["Sp. Attack"]}</td>
            </tr>
            <tr>
              <th>Special Defense</th>
              <td>{props.base["Sp. Defense"]}</td>
            </tr>
            <tr>
              <th>Speed</th>
              <td>{props.base.Speed}</td>
            </tr>
          </tbody>
        </table>
      </figcaption>
    </div>
  );
}
