import {
  Slot,
  component$,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { PokemonListContext, PokemonGameContext } from "~/context";
import type { PokemonListState, PokemonGameState } from "~/context";

export const PokemonProvider = component$(() => {
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

  return <Slot />;
});
