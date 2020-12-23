import React from "react";
import "../App.css";
import geodude from "../assets/geodude.png";
import porygon from "../assets/porygon.png";
import scyther from "../assets/scyther.png";
import unown_r from "../assets/unown_r.png";
import unown_p from "../assets/unown_p.png";
import unown_s from "../assets/unown_s.png";

export default function Header() {
  return (
    <div className="header-wrapper">
      <div className="header-text">POKEFIGHT</div>
      <div>
        <img src={unown_r} alt="unown_r" />
        <img src={unown_p} alt="unown_p" />
        <img src={unown_s} alt="unown_s" />
      </div>
    </div>
  );
}
