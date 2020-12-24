import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Risorsa from "../assets/Risorsa.png";

export default function Header() {
  return (
    <div className="header-wrapper">
      <nav>
            <Link to="/">
              <img src={Risorsa} alt="Pokemon Rock Paper Scissors" />
            </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
