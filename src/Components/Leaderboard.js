import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(`https://pokefightv2.herokuapp.com/game/leaderboard`)
      .then((res) => res.json())
      .then((res) => {
        setLeaderboard(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
          <th></th>
            <th>Player</th>
            <th>Pokemon</th>
            <th>Rounds</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((game, index) => (
            <tr key={game._id}>
              <td>{`${index+1}.`}</td>
              <td>{game.name}</td>
              <td>{game.pokemon}</td>
              <td>{game.defeated_pokemon}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Link to="/" className="leaderboard-button-link">
        Start new game
      </Link> */}
    </div>
  );
}
