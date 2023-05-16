import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = (initialValue: number = 10) => {
  const counter = useSignal(initialValue);

  const increaseCounter = $(() => {
    counter.value++;
  });

  const decreaseCounter = $(() => {
    counter.value--;
  });

  return {
    // counter: counter.value,
    counter: useComputed$(() => counter.value),
    increaseCounter,
    decreaseCounter,
  };
};
