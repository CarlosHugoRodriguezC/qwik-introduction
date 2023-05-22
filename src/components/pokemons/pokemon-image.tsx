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
        class={[
          {
            hidden: !imageLoaded.value,
            "brightness-0": !isVisible,
            "transform -scale-x-100": backImage,
          },
          "transition-all duration-1000 ease-in-out",
        ]}
        width="100%"
        height="auto"
        // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
        src={imageUrl.value}
        style={{ height: `${size}px` }}
        onLoad$={() => {
          // setTimeout(() => {
          imageLoaded.value = true;
          // }, 2000);
        }}
        // onLoadedData$={() => {
        //   console.log("onLoadedData");
        //   imageLoaded.value = true;
        // }}
      />
    </div>
  );
});
