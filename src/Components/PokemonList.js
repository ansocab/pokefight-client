import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import mew from "../assets/mew.gif";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [noSearchResult, setNoSearchResult] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getDataFromPokefighten = () => {
    setLoading(true);
    fetch(`https://pokefightv2.herokuapp.com/pokemon/page/?page=${currentPage}`)
      .then((response) => response.json())
      .then((response) => {
        setTotalPages(response.total_pages);
        setPokemon(response.pokemon_list);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataFromPokefighten();
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    const getSearchResults = () => {
      fetch(`http://pokefightv2.herokuapp.com/search/?query=${searchQuery}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          if(response.length !== 0) {
            setPokemon(response);
            setNoSearchResult(false)
            setLoading(false);
          } else {
            console.log("no pokemon found")
            setNoSearchResult(true)
          }
        })
        .catch((err) => console.log(err));
    };

    if (searchQuery.length !== 0) {
      getSearchResults();
    }
  }, [searchQuery]);

  const handleChange = (e) => {
    const query = e.target.value;
    setQuery(query);
    if (query.length > 2) {
      setSearchQuery(query);
    } else if (query.length === 0) {
      getDataFromPokefighten();
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <div>
      <h2 className="card__name">Choose your pokemon!</h2>
      <div className="search-wrapper">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          className="search-input-field"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Pokemon name"
        />
      </div>
      {loading ? (noSearchResult ? <p className="search-feedback">No pokemon found</p> :
        <img
          src={mew}
          alt="loading mew gif"
          style={{ margin: "150px 0", height: "100px", width: "auto" }}
        />
      ) : (
        <ul className="cardList">
          {pokemon.map((item) => (
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
      )}
      <Pagination handlePageClick={handlePageClick} pageCount={totalPages} />
    </div>
  );
}
