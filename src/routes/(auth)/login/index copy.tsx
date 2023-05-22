import {
  $,
  component$,
  useComputed$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";

import styles from "./login.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const formState = useStore({ email: "", password: "", formPosted: false });

  const emailError = useComputed$(() => {
    if (!formState.formPosted) {
      return "";
    }
    if (formState.email.includes("@")) {
      return "";
    }
    return "not-valid";
  });

  const passwordError = useComputed$(() => {
    if (!formState.formPosted) {
      return "";
    }
    if (formState.password.length > 5) {
      return "";
    }
    return "not-valid";
  });

  const isFormValid = useComputed$(() => {
    if (
      !(emailError.value === "not-valid") ||
      !(passwordError.value === "not-valid")
    ) {
      return false;
    }

    return true;
  });

  const handleSubmit = $(() => {
    formState.formPosted = true;
    const { email, password } = formState;

    console.log({ email, password, isFormValid });
  });

  return (
    <form class="login-form" onSubmit$={handleSubmit} preventdefault:submit>
      <div class="relative">
        <input
          name="email"
          type="text"
          class={emailError}
          placeholder="Email address"
          value={formState.email}
          onInput$={(ev) =>
            (formState.email = (ev.target as HTMLInputElement).value)
          }
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          class={passwordError}
          value={formState.password}
          onInput$={(ev) =>
            (formState.password = (ev.target as HTMLInputElement).value)
          }
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button disabled={!isFormValid.value && formState.formPosted}>
          Ingresar
        </button>
      </div>

      <code>{JSON.stringify(formState, undefined, 2)}</code>
    </form>
  );
});
