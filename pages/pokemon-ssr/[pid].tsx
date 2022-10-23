import type { NextPage } from "next";
import { useRouter } from "next/router";
import { PokemonHabitats } from "../../lib/pokemon";

type PokeDetailProps = {
  detail_habitats: any;
};

const PokeSSRDetail: NextPage<PokeDetailProps> = ({ detail_habitats }) => {
  const router = useRouter();
  const { pid } = router.query;
  console.log(router, detail_habitats);

  return (
    <div>
      <div className="font-bold">
        <h1>Habitat: {pid}</h1>
        <h2>List Pokemons</h2>
      </div>
      <ul className="mt-2">
        {detail_habitats[pid as string].pokemon_species.map(
          (data: any, idx: number) => (
            <li key={idx}>{data.name}</li>
          )
        )}
      </ul>
      <br />
      <br />
    </div>
  );
};

export default PokeSSRDetail;

// `getStaticPaths` requires using `getStaticProps`
export async function getServerSideProps(context: any) {
  const habitats = await PokemonHabitats();
  const detail_habitats: any = {};
  for (const res of habitats.results) {
    const detail = await PokemonHabitats(habitats.results.indexOf(res) + 1);
    detail_habitats[res.name] = detail;
  }
  console.log("SSR staticProps", context, detail_habitats);
  return {
    // Passed to the page component as props
    props: { detail_habitats: detail_habitats },
  };
}
