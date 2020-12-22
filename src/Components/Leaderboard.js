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
            <th>Fight</th>
            <th>No. of Rounds</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((game) => (
            <tr key={game._id}>
              <td>{`${game.pokemon_one} vs. ${game.pokemon_two}`}</td>
              <td>{game.number_of_rounds}</td>
              <td>
                {game.result === "tie" ? "Tie" : `Winner: ${game.result}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="leaderboard-button-link">
        Start new game
      </Link>
    </div>
  );
}
