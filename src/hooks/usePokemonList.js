import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedex_url: `https://pokeapi.co/api/v2/pokemon/`,
        nextUrl: "",
        prevUrl: "",
    });

    // ....................

    async function downloadPokemons() {
        setPokemonListState((state) => ({ ...state, isLoading: true }));

        const response = await axios.get(pokemonListState.pokedex_url); // this downloads list of 20 pokemons

        const pokemonResults = response.data.results; // We get array of pokemons from result

        console.log(response.data);
        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous,
        }));

        // setPrevUrl(response.data.previous);

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
        // console.log(pokiListResult);
        setPokemonListState((state) => ({
            ...state,
            pokemonList: pokiListResult,
            isLoading: false,
        }));
    }

    // ........................

    useEffect(() => { downloadPokemons() }, [pokemonListState.pokedex_url])


    return [pokemonListState, setPokemonListState]
}
export default usePokemonList;