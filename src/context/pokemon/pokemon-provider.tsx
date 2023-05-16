import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
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

  useVisibleTask$(() => {
    console.log("First visible task");
    if (localStorage.getItem("pokemonGame")) {
      const {
        isVisible = true,
        pokemonId = 10,
        showBack = false,
      } = JSON.parse(localStorage.getItem("pokemonGame")!) as PokemonGameState;
      pokemonGame.isVisible = isVisible;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.showBack = showBack;
    }
    // Read from local storage
  });
  useVisibleTask$(({ track }) => {
    console.log("Second visible task");
    track(() => [
      pokemonGame.isVisible,
      pokemonGame.pokemonId,
      pokemonGame.showBack,
    ]);

    localStorage.setItem("pokemonGame", JSON.stringify(pokemonGame));
  });

  return <Slot />;
});
