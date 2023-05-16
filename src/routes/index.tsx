import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { DocumentHead, Link, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {
  // const pokemonId = useSignal<number>(1);
  // const showBack = useSignal<boolean>(false);
  // const showPokemon = useSignal<boolean>(false);
  const pokemonGame = useContext(PokemonGameContext);

  const navigate = useNavigate();

  const changePokemon = $((value: number) => {
    console.log("changePogkemon", value);
    if (pokemonGame.pokemonId + value < 1) return;
    pokemonGame.pokemonId += value;
  });

  const goToPokemon = $(async () => {
    await navigate(`/pokemon/${pokemonGame.pokemonId}`);
  });

  return (
    <div class="flex flex-col justify-center items-center">
      <span class="text-4xl">Who's that pokemon?</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>
      {/* <Link href={`/pokemon/${pokemonId}/`}> */}
      <div onClick$={() => goToPokemon()}>
        <PokemonImage
          pokemonId={pokemonGame.pokemonId}
          isVisible={pokemonGame.isVisible}
          backImage={pokemonGame.showBack}
        />
      </div>
      {/* </Link> */}
      <div class="flex gap-3">
        <button onClick$={() => changePokemon(-1)} class="btn btn-primary">
          Previous
        </button>
        <button onClick$={() => changePokemon(1)} class="btn btn-primary">
          Next
        </button>
        <button
          onClick$={() => (pokemonGame.showBack = !pokemonGame.showBack)}
          class="btn btn-primary"
        >
          Flip
        </button>
        <button
          onClick$={() => (pokemonGame.isVisible = !pokemonGame.isVisible)}
          class="btn btn-primary"
        >
          Show
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
