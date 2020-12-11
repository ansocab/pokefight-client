import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import PokemonList from "./PokemonList";
import Game from "./Game";
import PokemonSupDetailView from "./PokemonSupDetailView";

import Leaderboard from "./Leaderboard";

export default function App() {
  return (
    <div>
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
