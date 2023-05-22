import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonProvider } from "~/context";

// import Header from "~/components/shared/navbar/navbar";
// import Footer from "~/components/shared/footer/footer";

// import styles from "./styles.css?inline";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  // useStyles$(styles);

  return (
    <PokemonProvider>
      {/* <Header /> */}
      <main class="flex-1 flex flex-col">
        <Slot />
      </main>
      {/* <Footer /> */}
    </PokemonProvider>
  );
});
