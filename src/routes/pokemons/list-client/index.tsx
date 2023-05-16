import {
  $,
  component$,
  useOn,
  useOnDocument,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getSmallPokemons } from "~/helpers/get-pokemons";
import { SmallPokemon } from "~/interfaces";

interface PokemonPageState {
  currentPage: number;
  pokemons: SmallPokemon[];
  isLoading: boolean;
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: [],
    isLoading: false,
  });

  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);
  //   console.log("visible");
  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);

  //   pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  // });

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    console.log("task");
    // pokemonState.isLoading = true;
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 30, 30);

    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  });

  useOnDocument(
    "scroll",
    $((event) => {
      if (pokemonState.isLoading) return;
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;
      if (currentScroll + 200 >= maxScroll) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    })
  );

  return (
    <>
      <div class="flex flex-col container mx-auto">
        <span class="text-5xl">Status</span>
        <span class="text-xl">Current Page: {pokemonState.currentPage}</span>
        <span class="text-xl">Is loading page: {}</span>
      </div>
      <div class="flex gap-3 justify-end container mx-auto items-center">
        {/* <button
          class="btn btn-primary"
          onClick$={() => pokemonState.currentPage--}
        >
          Previous
        </button> */}
        <button
          class="btn btn-primary"
          onClick$={() => pokemonState.currentPage++}
        >
          Next
        </button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {pokemonState.pokemons.map((pokemon) => (
          <div
            key={`client-${pokemon.name.replace(" ", "_")}-${pokemon.id}`}
            class="m-5 flex flex-col justify-center items-center"
          >
            <PokemonImage pokemonId={pokemon.id} isVisible />
            <span class="capitalize">
              {pokemon.name} {pokemon.id}
            </span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik | List Client",
};
