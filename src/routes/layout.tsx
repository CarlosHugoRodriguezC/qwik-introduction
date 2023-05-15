import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import Header from "~/components/shared/navbar/navbar";
import Footer from "~/components/shared/footer/footer";

import styles from "./styles.css?inline";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <Header />
      <main class="flex-1 flex flex-col items-center justify-center">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
