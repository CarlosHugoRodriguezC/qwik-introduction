import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Footer from "~/components/shared/footer/footer";
import Navbar from "~/components/shared/navbar/navbar";

export const useCheckAuthCookie = routeLoader$(async ({ cookie, redirect }) => {

  const jwtCookie = cookie.get("jwt");

  if(jwtCookie){
    console.log("jwtCookie", jwtCookie)
    return;
  } 

  redirect(302, "/login");
});

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="flex flex-col items-center justify-center mt-2 flex-1">
        <h3 class="text-2xl">Dashboard layout</h3>
        <Slot />
      </div>
      <Footer />
    </>
  );
});
