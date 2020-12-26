import React, { useState, useEffect } from "react";
import mew from "../assets/mew.gif";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`https://pokefightv2.herokuapp.com/game/leaderboard`)
      .then((res) => res.json())
      .then((res) => {
        if (mounted) {
          setLeaderboard(res);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
    return () => (mounted = false);
  }, []);

  return (
    <div className="leaderboard">
      <h2 className="card__name">Leaderbaord</h2>
      {loading ? (
        <img
          src={mew}
          alt="loading mew gif"
          style={{ margin: "150px 0", height: "100px", width: "auto" }}
        />
      ) : (
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
                <td>{`${index + 1}.`}</td>
                <td>{game.name}</td>
                <td>{game.pokemon}</td>
                <td>{game.defeated_pokemon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* <Link to="/" className="leaderboard-button-link">
        Start new game
      </Link> */}
    </div>
  );
}
