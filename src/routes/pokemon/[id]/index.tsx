import { component$, useContext } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";
import { usePokemonGame } from "~/hooks/usePokemonGame";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    redirect(301, "/");
  }

  if (id <= 0 || id > 1000) {
    redirect(301, "/");
  }

  return id;
});

export default component$(() => {
  // const location = useLocation();
  const pokemonId = usePokemonId();
  const { isVisible, showBack, toggleVisible, toggleBack } = usePokemonGame();

  return (
    <>
      {/* <h1>Pokemon: {location.params.id}</h1> */}
      <h1 class="text-5xl">Pokemon: {pokemonId}</h1>
      <PokemonImage
        pokemonId={pokemonId.value}
        isVisible={isVisible.value}
        backImage={showBack.value}
      />
      <div class="flex justify-center items-center gap-3">
        <button onClick$={toggleBack} class="btn btn-primary">
          {showBack.value ? "Front" : "Back"}
        </button>
        <button onClick$={toggleVisible} class="btn btn-primary">
          {isVisible.value ? "Hide" : "Show"}
        </button>
      </div>
    </>
  );
});

export const head = {
  title: "PokeQwik | Pokemon",
};
