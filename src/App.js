import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonList from "./PokemonList";
import PokemonDetailedView from "./PokemonDetailedView";
import PokemonSupDetailView from "./PokemonSupDetailView";
import Header from "./Header.js";

export default function App() {
  return (
    <div>
      <Header />

      <Switch>
        <Route exact path="/">
          <PokemonList />
        </Route>

        <Route path="/:id">
          <PokemonDetailedView />
        </Route>

        <Route path="/:id/:info">
          <PokemonSupDetailView />
        </Route>
      </Switch>
    </div>
  );
}
