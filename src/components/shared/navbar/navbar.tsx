import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../../icons/qwik";
import styles from "./navbar.module.css";
import { Link } from "@builder.io/qwik-city";

const routes = [
  {
    name: "SSR-List",
    path: "/pokemons/list-ssr/",
  },
  {
    name: "Client-List",
    path: "/pokemons/list-client",
  },
  {
    name: "Counter",
    path: "/counter",
  },
];

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" title="qwik">
            <QwikLogo height={50} />
          </Link>
        </div>
        <ul>
          {routes.map((route) => (
            <li key={route.path}>
              <Link href={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
});
