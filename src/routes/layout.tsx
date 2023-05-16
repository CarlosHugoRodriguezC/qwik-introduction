import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonGameContext, PokemonListContext } from "~/context";
import type { PokemonGameState, PokemonListState } from "~/context";

import Header from "~/components/shared/navbar/navbar";
import Footer from "~/components/shared/footer/footer";

import styles from "./styles.css?inline";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);

  const pokemonGame = useStore<PokemonGameState>({
    isVisible: false,
    pokemonId: 1,
    showBack: false,
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  return (
    <>
      <Header />
      <main class="flex-1 flex flex-col">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
