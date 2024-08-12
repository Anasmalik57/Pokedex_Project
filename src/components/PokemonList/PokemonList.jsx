import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";
import { useEffect } from "react";

function PokemonList() {
  const [pokemonListState, setPokemonListState] = usePokemonList(false);

  useEffect(()=>{
    console.log("rendering here");
  }, [])
  return (
    <div id="pokemonListWrapper">
      {/* <div id="list"> PokemonLists:</div> */}
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading....."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={pokemonListState.prevUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.prevUrl;
            setPokemonListState({
              ...pokemonListState,
              pokedex_url: urlToSet,
            });
          }}
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.nextUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.nextUrl;

            setPokemonListState({
              ...pokemonListState,
              pokedex_url: urlToSet,
            });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
