import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext);

  const changePokemon = $((value: number) => {
    if (pokemonGame.pokemonId + value < 1) return;
    pokemonGame.pokemonId += value;
  });

  const toggleBack = $(() => {
    pokemonGame.showBack = !pokemonGame.showBack;
  });

  const toggleVisible = $(() => {
    pokemonGame.isVisible = !pokemonGame.isVisible;
  });

  return {
    // Signals, computed or variables
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    showBack: useComputed$(() => pokemonGame.showBack),
    isVisible: useComputed$(() => pokemonGame.isVisible),
    // Methods
    nextPokemon: $(() => changePokemon(1)),
    previousPokemon: $(() => changePokemon(-1)),
    toggleBack: toggleBack,
    toggleVisible: toggleVisible,
  };
};
