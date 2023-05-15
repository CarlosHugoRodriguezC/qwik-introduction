import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  pokemonId: number;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

const baseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const PokemonImage = component$((props: Props) => {
  const { pokemonId, size = 200, backImage = false, isVisible=false } = props;
  const imageLoaded = useSignal<boolean>(false);

  const imagefront = `${baseUrl}/${pokemonId}.png`
  const imageBack = `${baseUrl}/back/${pokemonId}.png`
  

  useTask$(({ track }) => {
    track(() => pokemonId);

    imageLoaded.value = false;
  });

  return (
    <div
      class="flex justify-center items-center py-10 h-52"
      
    >
      {!imageLoaded.value && <span>Loading...</span>}
      <img
        class={{
          hidden: !imageLoaded.value,
          "brightness-0": !isVisible,
          "drop-shadow-pokeshadow transition-all duration-500 ease-in-out": true,
          "transform -scale-x-100": backImage,
        }}
        // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
        src={`${backImage ? imageBack : imagefront}`}
        style={{ height: `${size}px` }}
        onLoad$={() => (imageLoaded.value = true)}
        
      />
    </div>
  );
});
