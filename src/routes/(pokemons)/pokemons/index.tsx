import { component$ } from "@builder.io/qwik";
import type{ DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Hola Mundo</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik | Pokemon",
};
