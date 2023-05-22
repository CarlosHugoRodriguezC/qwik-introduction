import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="flex flex-col justify-center items-center flex-1 py-10">
      <Slot />
      <Link class="mt-10" href="/">
        Return to Home
      </Link>
    </div>
  );
});
