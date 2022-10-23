import { fetch } from "next/dist/compiled/@edge-runtime/primitives/fetch";

export type PokeProps = {
  pokemons: any;
  pokemonTypes: any;
  pokemonSpecies: any;
  pokemonHabitats: any;
  pokemonGender: any;
  pokemonAreas: any;
  pokemonShapes: any;
};

export async function Pokemons(offset = 0, limit = 100) {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=" + limit + "&offset=" + offset
  );
  return await res.json();
}

export async function PokemonTypes(offset = 0, limit = 100) {
  const res = await fetch(
    "https://pokeapi.co/api/v2/type/?limit=" + limit + "&offset=" + offset
  );
  return await res.json();
}

export async function PokemonSpecies(offset = 0, limit = 100) {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon-species/?limit=" +
      limit +
      "&offset=" +
      offset
  );
  return await res.json();
}

export async function PokemonHabitats(id: number = 0, offset = 0, limit = 100) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon-habitat/${id ? id : ""}?limit=` +
      limit +
      "&offset=" +
      offset
  );
  return await res.json();
}

export async function PokemonGender(offset = 0, limit = 100) {
  const res = await fetch(
    "https://pokeapi.co/api/v2/gender/?limit=" + limit + "&offset=" + offset
  );
  return await res.json();
}

export async function PokemonShapes(offset = 0, limit = 100) {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon-shape/?limit=" +
      limit +
      "&offset=" +
      offset
  );
  return await res.json();
}

export async function PokemonAreas(offset = 0, limit = 100) {
  const res = await fetch(
    "https://pokeapi.co/api/v2/location-area/?limit=" +
      limit +
      "&offset=" +
      offset
  );
  return await res.json();
}
