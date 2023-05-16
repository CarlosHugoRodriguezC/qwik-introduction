import { component$ } from "@builder.io/qwik";
import {
  RequestEventLoader,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    redirect(301, "/");
  }

  if (id <= 0 || id > 1000) {
    redirect(301, "/");
  }

  return id;
});

export default component$(() => {
  // const location = useLocation();
  const pokemonId = usePokemonId();

  return (
    <>
      {/* <h1>Pokemon: {location.params.id}</h1> */}
      <h1 class="text-5xl">Pokemon: {pokemonId}</h1>
      {/* <PokemonImage pokemonId={location.params.id} isVisible={true} /> */}
    </>
  );
});

export const head = {
  title: "PokeQwik | Pokemon",
};
