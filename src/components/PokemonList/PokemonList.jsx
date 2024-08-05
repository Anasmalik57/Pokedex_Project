import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon/";

  async function downloadPokemons() {
    const response = await axios.get(POKEDEX_URL); // this downloads list of 20 pokemons

    const pokemonResults = response.data.results; // We get array of pokemons from result

    console.log(response.data);

    // iterating over the array of pokemons and using their url to create an array of promises
    // that will download those 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    // passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultsPromise); // array of 20 pokemon detaile data
    console.log(pokemonData);

    // now iterate on the data of each pokemon and extract id, name , image, types
    const pokiListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;

      return {
        name: pokemon.name,
        id: pokemon.id,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });
    console.log(pokiListResult);
    setPokemonList(pokiListResult);

    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, []);

  return (
    <div id="pokemonListWrapper">
      {/* <div id="list"> PokemonLists:</div> */}
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading.....😄😄😄"
          : pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
      </div>
      <div className="controls">
        <button>Prev</button>
        <button>Next</button>
      </div>
    </div>
  );
}

export default PokemonList;
