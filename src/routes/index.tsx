import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { DocumentHead, Link, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";
import { usePokemonGame } from "~/hooks/usePokemonGame";

export default component$(() => {
  const navigate = useNavigate();

  const {
    pokemonId,
    isVisible,
    showBack,
    toggleBack,
    toggleVisible,
    nextPokemon,
    previousPokemon,
  } = usePokemonGame();

  const goToPokemon = $(async () => {
    await navigate(`/pokemon/${pokemonId.value}`);
  });

  return (
    <div class="flex flex-col justify-center items-center">
      <span class="text-4xl">Who's that pokemon?</span>
      <span class="text-9xl">{pokemonId.value}</span>
      {/* <Link href={`/pokemon/${pokemonId}/`}> */}
      <div onClick$={() => goToPokemon()}>
        <PokemonImage
          pokemonId={pokemonId.value}
          isVisible={isVisible.value}
          backImage={showBack.value}
        />
      </div>
      {/* </Link> */}
      <div class="flex gap-3">
        <button onClick$={previousPokemon} class="btn btn-primary">
          Previous
        </button>
        <button onClick$={nextPokemon} class="btn btn-primary">
          Next
        </button>
        <button onClick$={toggleBack} class="btn btn-primary">
          {showBack.value ? "Front" : "Back"}
        </button>
        <button onClick$={toggleVisible} class="btn btn-primary">
          {isVisible.value ? "Hide" : "Show"}
        </button>
      </div>
    </div>
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
