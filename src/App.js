import React, { useEffect, useContext } from "react";
import "./App.css";
import { GameContext } from "./GameContext";
import { Switch, Route, useHistory } from "react-router-dom";
import PokemonList from "./Components/PokemonList";
import Game from "./Components/Game";
import PokemonSupDetailView from "./Components/PokemonSupDetailView";
import Header from "./Components/Header";

import Leaderboard from "./Components/Leaderboard";

export default function App() {
  const { updateGameText } = useContext(GameContext);
  const history = useHistory();
  
  useEffect(() => {
  return history.listen((location) => {
    updateGameText("reset")
  })
}, [history, updateGameText])

  return (
    <div>
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

        <Route path="/:id/:info">
          <PokemonSupDetailView />
        </Route>
      </Switch>
    </div>
  );
}
