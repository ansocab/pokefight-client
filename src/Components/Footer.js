import React from "react";
import "../App.css";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <p>By Ana Caballero | GitHub Repo:</p>
      <span className="p-2"><a href="https://github.com/ansocab/pokefight-client" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub}/></a></span>
    </div>
  );
}
