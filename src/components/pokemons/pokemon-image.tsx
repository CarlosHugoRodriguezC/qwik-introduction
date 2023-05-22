import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

interface Props {
  pokemonId: number | string;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

const baseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const PokemonImage = component$((props: Props) => {
  const { pokemonId, size = 200, backImage = false, isVisible = false } = props;
  const imageLoaded = useSignal<boolean>(false);

  useTask$(({ track }) => {
    track(() => pokemonId);

    imageLoaded.value = false;
  });

  const imageUrl = useComputed$(async () => {
    if (pokemonId === "") return "";
    if (backImage) return `${baseUrl}back/${pokemonId}.png`;
    return `${baseUrl}${pokemonId}.png`;
  });

  return (
    <div class="flex justify-center items-center py-10 h-52">
      {!imageLoaded.value && <span>Loading...</span>}
      <img
        class={{
          hidden: !imageLoaded.value,
          "brightness-0": !isVisible,
          "drop-shadow-pokeshadow transition-all duration-500 ease-in-out":
            true,
          "transform -scale-x-100": backImage,
        }}
        width="100%"
        height="auto"
        // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
        src={imageUrl.value}
        style={{ height: `${size}px` }}
        onLoad$={(event) => {
          console.log("onLoad", event);
          imageLoaded.value = true;
        }}
        // onLoadedData$={() => {
        //   console.log("onLoadedData");
        //   imageLoaded.value = true;
        // }}
      />
    </div>
  );
});
