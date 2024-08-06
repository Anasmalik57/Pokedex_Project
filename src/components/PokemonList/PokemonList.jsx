import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pokedex_url, setPokedex_url] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );

  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  async function downloadPokemons() {
    setIsLoading(true);

    const response = await axios.get(pokedex_url); // this downloads list of 20 pokemons

    const pokemonResults = response.data.results; // We get array of pokemons from result

    console.log(response.data);
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

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
  }, [pokedex_url]);

  return (
    <div id="pokemonListWrapper">
      {/* <div id="list"> PokemonLists:</div> */}
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading....."
          : pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={prevUrl == null}
          onClick={() => setPokedex_url(prevUrl)}
        >
          Prev
        </button>
        <button
          disabled={nextUrl == null}
          onClick={() => setPokedex_url(nextUrl)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
