"use client";

import { useActionState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signup, login } from "../../lib/auth-actions";
import styles from "./auth.module.css";
import { useFormStatus } from "react-dom";


const Auth = () => {

    const params = useSearchParams();
    const router = useRouter();
    const { pending } = useFormStatus();

    const mode = params.get("mode") || "login";
    const action = mode === "signup" ? signup : login;

    const [state, formAction] = useActionState(action, {});

    const toggleMode = () => {
        router.push(`?mode=${mode === "signup" ? "login" : "signup"}`);
      };





  return (
    <main className={styles.container}>
      <form className={styles.form} action={formAction}>
        <h2>{mode === "signup" ? "Sign Up" : "Login"}</h2>

        {mode === "signup" && (
          <div>
            <input name="name" placeholder="Name" defaultValue={state?.name} required />
            {state?.errors?.name && (
              <p className={styles.error}>{state.errors.name}</p>
            )}
          </div>
        )}

        <div>
          <input name="email" type="email" placeholder="Email" defaultValue={state?.email} required />
          {state?.errors?.email && (
            <p className={styles.error}>{state.errors.email}</p>
          )}
        </div>

        <div>
          <input name="password" type="password" placeholder="Password" required />
          {state?.errors?.password && (
            <p className={styles.error}>{state.errors.password}</p>
          )}
        </div>

        <button className={styles.checkin} type="submit" disabled={pending}>
          {mode === "signup" ? "Sign Up" : "Login"}
        </button>

        {state?.success && (
          <p className={styles.success}>
            {mode === "signup"
              ? "Account created 🎉"
              : "Login successful 🎉"}
          </p>
        )}

        <p className={styles.switch}>
          {mode === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <span onClick={toggleMode}>
            {mode === "signup" ? " Login" : " Sign up"}
          </span>
        </p>
      </form>
    </main>
  )
}

export default Auth


