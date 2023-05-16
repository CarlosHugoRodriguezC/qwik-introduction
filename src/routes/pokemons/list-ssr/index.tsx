import { component$, useComputed$ } from "@builder.io/qwik";
import {
  DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getSmallPokemons } from "~/helpers/get-pokemons";
import type { SmallPokemon } from "~/interfaces";

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get("offset") || "0");
    if (isNaN(offset)) redirect(301, pathname);
    if (offset < 0) redirect(301, pathname);

    return await getSmallPokemons(offset);
  }
);

export default component$(() => {
  const pokemonResponse = usePokemonList();

  const location = useLocation();

  console.log(location.url.searchParams.get("offset"));

  const currentOffset = useComputed$<number>(() => {
    const offset = location.url.searchParams.get("offset");
    if (!offset) return 0;
    return parseInt(offset);
  });

  return (
    <>
      <div class="flex flex-col container mx-auto">
        <span class="text-5xl">Status</span>
        <span class="text-xl">Current offset: {currentOffset.value}</span>
        <span class="text-xl">
          Is loading page: {location.isNavigating ? "Yes" : "No"}
        </span>
      </div>
      <div class="flex gap-3 justify-end container mx-auto items-center">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary"
        >
          Previous
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary"
        >
          Next
        </Link>
      </div>
      <div class="grid grid-cols-6 mt-5">
        {pokemonResponse.value.map((pokemon) => (
          <div
            key={pokemon.id}
            class="m-5 flex flex-col justify-center items-center"
          >
            <PokemonImage pokemonId={pokemon.id} isVisible />
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik | List SSR",
};
