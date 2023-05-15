import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokemonId = useSignal<number>(1);
  const showBackImage = useSignal<boolean>(false);
  const showPokemon = useSignal<boolean>(false);

  const changePogkemon = $((value: number) => {
    console.log("changePogkemon", value);
    if (pokemonId.value + value < 1) return;
    pokemonId.value += value;
  });

  return (
    <>
      <span class="text-4xl">Who's that pokemon?</span>
      <span class="text-9xl">{pokemonId}</span>
      <PokemonImage
        pokemonId={pokemonId.value}
        isVisible={showPokemon.value}
        backImage={showBackImage.value}
      />
      <div class="flex gap-3">
        <button onClick$={() => changePogkemon(-1)} class="btn btn-primary">
          Previous
        </button>
        <button onClick$={() => changePogkemon(1)} class="btn btn-primary">
          Next
        </button>
        <button
          onClick$={() => (showBackImage.value = !showBackImage.value)}
          class="btn btn-primary"
        >
          Flip
        </button>
        <button
          onClick$={() => (showPokemon.value = !showPokemon.value)}
          class="btn btn-primary"
        >
          Show
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik | Home",
  meta: [
    {
      name: "description",
      content: "First application with qwik",
    },
  ],
};
