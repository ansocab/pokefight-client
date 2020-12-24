import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import Header from "./Header";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState("");
  // const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getDataFromPokefighten = () => {
      fetch(`https://pokefightv2.herokuapp.com/pokemon/?page=${currentPage}`)
        .then((response) => response.json())
        .then((response) => {
          setPokemon(response);
          // setPageCount(Math.ceil(response.length / 12));
        })
        .catch((err) => console.log(err));
    };
    getDataFromPokefighten();
  }, [currentPage]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected+1);
  }

  return (
    <div>
      <h2 className="card__name">Choose your pokemon!</h2>
      <input
      className="search-input-field"
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Search Pokedex"
      />
      <ul className="cardList">
        {pokemon
          .filter((p) => p.name.english.toLowerCase().includes(filter.toLowerCase()))
          .map((item) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              type={item.type}
              base={item.base}
              origin="list"
              key={item.id}
            />
          ))}
      </ul>
      <Pagination handlePageClick={handlePageClick}/>
    </div>
  );
}
