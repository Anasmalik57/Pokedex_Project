import { useEffect, useState } from "react";
import PokemonList from "../PokemonList/PokemonList.jsx";
import Search from "../Search/Search.jsx";
import "./Pokedex.css";
import PokemonDetails from "../PokemonDetails/PokemonDetails.jsx";

function Pokedex() {
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(()=>{},[searchTerm])

  return (
    <>
      <div className="pokedex-wrapper">
        <Search updateSearchTerm={setSearchTerm} />
        {searchTerm}
        { (!searchTerm) ? <PokemonList />: <PokemonDetails key={searchTerm} pokemonName={searchTerm} /> }
      </div>
    </>
  );
}
export default Pokedex;
