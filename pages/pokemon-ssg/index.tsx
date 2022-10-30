import type { NextPage } from "next";
import { useMemo, useState, useReducer, FC } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { CountCard } from "../../components/cards/counter_card";
import { TablePagination } from "../../components/table/table_pagination";
import { TableSort } from "../../components/table_sort/table_sort";
import {
  Pokemons,
  PokemonTypes,
  PokemonSpecies,
  PokemonGender,
  PokemonHabitats,
  PokemonAreas,
  PokemonShapes,
  PokeProps,
} from "../../lib/pokemon";
import Link from "next/link";

type Pokemon = {
  name: string;
  url: string;
};

//const columnHelper = createColumnHelper<Pokemon>();

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {}),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
  }),
  columnHelper.accessor("visits", {
    header: () => <span className="text-red-800">Visits</span>,
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
  }),
];

export const Table = () => {
  const datax: { index: number; name: string; description: string } = {
    index: 1,
    name: "asdasd",
    description: "good",
  };
  const [data, setData] = useState([...defaultData]);
  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const addMore = () => {
    setData((prevState) => {
      // console.log("Add", prevState);
      return [
        ...prevState,
        {
          firstName: "Joe",
          lastName: "Da",
          age: 35,
          visits: 10,
          status: "Expert",
          progress: 12,
        },
      ];
    });
  };

  console.log("Model render", table.getHeaderGroups());

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/*<tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>*/}
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
      <button onClick={addMore} className="border p-2">
        Add More
      </button>
    </div>
  );
};

// const columns = useMemo();

const PokeSSG: NextPage<PokeProps> = (props) => {
  // console.log(props);
  return (
    <>
      <h1>SSG</h1>
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
                <Link href={"pokemon-ssg/" + data.name}>
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

export default PokeSSG;

export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const pokemons = await Pokemons();
  const pokemonTypes = await PokemonTypes();
  const pokemonSpecies = await PokemonSpecies();
  const pokemonHabitats = await PokemonHabitats();
  const pokemonGender = await PokemonGender();
  const pokemonAreas = await PokemonAreas();
  const pokemonShapes = await PokemonShapes();
  console.log("Do request SSG");
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
