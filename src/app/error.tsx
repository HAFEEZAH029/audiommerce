"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ textAlign: "center", padding: "4rem 1.5rem", marginBottom: "12rem", marginTop: "10rem" }}>
      <h2>Something went wrong</h2>
      <p style={{ marginBottom: "1.5rem",marginTop: "0.8rem" }}>
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          background: "#d87d4a",
          color: "white",
          border: "none",
          padding: "0.75rem 2rem",
          cursor: "pointer",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "1.5rem",
        }}
      >
        Try Again
      </button>
    </div>
  );
}
