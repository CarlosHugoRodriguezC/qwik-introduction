import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./login.css?inline";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";

export const useLoginUserAction = routeAction$(
  (data, { cookie, redirect }) => {
    const { email, password } = data;

    if (email === "test@mail.com" && password === "123456") {
      const token = "my-jwt-t0k3n";
      cookie.set("jwt", token, { secure: true, path: "/" });

      redirect(302, "/dashboard");
      return {
        success: true,
        jwt: token,
      };
    }
    return {
      success: false,
    };
  },
  zod$({
    email: z.string().email("Invalid format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })
);

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLoginUserAction();

  return (
    <Form class="login-form mt-5" action={action}>
      <div class="relative">
        <input name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button>Ingresar</button>
      </div>
      <p>{action.value?.success && `Authenticated: ${action.value?.jwt}`}</p>

      <code>{JSON.stringify(action.value, undefined, 2)}</code>
    </Form>
  );
});
