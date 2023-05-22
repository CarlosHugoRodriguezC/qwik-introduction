import { component$ } from "@builder.io/qwik";
import { useCounter } from "~/hooks/useCounter";

export default component$(() => {
  const { counter, increaseCounter, decreaseCounter } = useCounter(5);

  return (
    <div class="flex flex-col items-center justify-center flex-1">
      <h1 class="text-2xl">Counter</h1>
      <span class="text-7xl">{counter.value}</span>
      <div class="flex justify-center gap-3 my-10">
        <button class="btn btn-primary" onClick$={decreaseCounter}>
          -1
        </button>
        <button class="btn btn-primary" onClick$={increaseCounter}>
          +1
        </button>
      </div>
    </div>
  );
});
