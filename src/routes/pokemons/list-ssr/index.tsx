import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import {
  DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { Modal } from "~/components/shared";
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
  const modalVisible = useSignal(false);
  const pokemonSelected = useStore<SmallPokemon>({ id: "", name: "" });

  console.log(location.url.searchParams.get("offset"));

  const currentOffset = useComputed$<number>(() => {
    const offset = location.url.searchParams.get("offset");
    if (!offset) return 0;
    return parseInt(offset);
  });

  const selectPokemon = $(async (id: string, name: string) => {
    pokemonSelected.id = id;
    pokemonSelected.name = name;
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
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
            onClick$={() => selectPokemon(pokemon.id, pokemon.name)}
            class="m-5 pb-5 rounded-xl flex flex-col justify-center items-center border-2 border-transparent transition-all hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500"
          >
            <PokemonImage pokemonId={pokemon.id} isVisible />
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))}
      </div>
      <Modal
        show={modalVisible.value}
        onClose={closeModal}
        persistent
        size="md"
      >
        <div q:slot="title">{pokemonSelected.name}</div>
        <div q:slot="content" class="flex flex-col justify-center items-center">
          <PokemonImage pokemonId={pokemonSelected.id} isVisible />
          <span> Asking to chatgpt</span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik | List SSR",
};
