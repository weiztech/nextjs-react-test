import type { NextPage } from "next";
import { CountCard } from "../components/cards/counter_card";
import {
  PokemonAreas,
  PokemonGender,
  PokemonHabitats,
  Pokemons,
  PokemonShapes,
  PokemonSpecies,
  PokemonTypes,
  PokeProps,
} from "../lib/pokemon";
import Link from "next/link";

const PokeSSR: NextPage<PokeProps> = (props) => {
  console.log("Poke SSR", props);
  return (
    <>
      <h1>SSR</h1>
      <div className="flex flex-col xl:flex-row xl:space-x-6 mx-1">
        <div className="flex flex-row space-x-2 md:space-x-6 text-sm text-center flex-1 text-xs sm:text-sm">
          <CountCard label="Total Pokemon" ttl={props.pokemons.count} />
          <CountCard label="Pokemon Species" ttl={props.pokemonSpecies.count} />
          <CountCard label="Pokemon Type" ttl={props.pokemonTypes.count} />
        </div>

        <div className="flex space-x-0.5 flex-row md:space-x-3 xl:space-x-6 text-center text-sm mt-5 xl:mt-0 flex-1 text-xs sm:text-sm">
          <CountCard
            label="Pokemon Gender"
            ttl={props.pokemonGender.count}
            className="bg-blue-500"
          />
          <CountCard
            label="Pokemon Habitats"
            ttl={props.pokemonHabitats.count}
            className="bg-blue-500"
          />
          <CountCard
            label="Pokemon Shapes"
            ttl={props.pokemonShapes.count}
            className="bg-gray-700 bg-opacity-90"
          />
          <CountCard
            label="Pokemon Areas"
            ttl={props.pokemonAreas.count}
            className="bg-gray-700 bg-opacity-90"
          />
        </div>
      </div>
      <div className="flex flex-col mt-5 space-x-2 lg:flex-row">
        <div className="flex-1">
          <h1 className="text-2xl">Habitats</h1>
          <ul>
            {props.pokemonHabitats.results.map((data: any, idx: number) => (
              <li key={idx}>
                <Link href={"pokemon-ssr/" + data.name}>
                  <a className="text-blue-600 hover:text-green-800 hover:font-semibold">
                    {data.name}
                  </a>
                </Link>
              </li>
            ))}
            <li></li>
          </ul>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="flex mx-3">
        <div>
          {/*<TablePagination />*/}
          {/*<TableSort />*/}
        </div>
      </div>
    </>
  );
};

export default PokeSSR;

export async function getServerSideProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const pokemons = await Pokemons();
  const pokemonTypes = await PokemonTypes();
  const pokemonSpecies = await PokemonSpecies();
  const pokemonHabitats = await PokemonHabitats();
  const pokemonGender = await PokemonGender();
  const pokemonAreas = await PokemonAreas();
  const pokemonShapes = await PokemonShapes();
  console.log("Do request SSR");
  // Props returned will be passed to the page component
  return {
    props: {
      pokemons,
      pokemonTypes,
      pokemonSpecies,
      pokemonHabitats,
      pokemonGender,
      pokemonAreas,
      pokemonShapes,
    },
  };
}
