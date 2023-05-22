import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import Footer from "~/components/shared/footer/footer";
import Header from "~/components/shared/navbar/navbar";

import styles from "../styles.css?inline";

export default component$(() => {
  useStyles$(styles);

  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
});
