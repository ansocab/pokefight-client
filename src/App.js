import React, { useEffect, useContext } from "react";
import "./App.css";
import { GameContext } from "./GameContext";
import { Switch, Route, useHistory } from "react-router-dom";
import PokemonList from "./Components/PokemonList";
import Game from "./Components/Game";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Leaderboard from "./Components/Leaderboard";

export default function App() {
  const { updateGameText, setPhase } = useContext(GameContext);
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      updateGameText("You're figthing against...");
      setPhase("prep");
    });
  }, [history, updateGameText]);

  return (
    <div className="main-wrapper">
      <Header />
      <Switch>
        <Route exact path="/">
          <PokemonList />
        </Route>

        <Route path="/fight/:id">
          <Game />
        </Route>

        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
