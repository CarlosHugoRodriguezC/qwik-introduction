import { createContextId } from "@builder.io/qwik";

export interface PokemonGameState {
  pokemonId: number;
  isVisible: boolean;
  showBack: boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>(
  "pokemon.game-context"
);
