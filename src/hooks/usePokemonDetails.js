import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id) {
    const [pokemon, setPokemon] = useState({});

    let pokemonListHookResponse = [];

    async function DownloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ""}`)

        console.log("s", pokemonOfSameTypes);
        

        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
            similarPokemons: pokemonOfSameTypes.data.pokemon /* add `.slice(0, 5)` for simiral 5 pokemons only */
        });
        console.log(response.data.types);

        setPokemonListState({ ...pokemonListState, type: response.data.types ? response.data.types[0].type.name : "" })
    }
    // ..............................
    const [pokemonListState, setPokemonListState] = pokemonListHookResponse = usePokemonList();
    // ..............................
    useEffect(() => {
        DownloadPokemon();
        console.log("List is Here => ", pokemon.types, pokemonListState);
    }, []);

    return [pokemon]
}

export default usePokemonDetails;