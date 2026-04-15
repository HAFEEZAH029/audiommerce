import { useEffect, useState } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Failed to fetch current user: ${res.status}`);
        }

        const data = await res.json();

        if (isMounted) {
          setUser(data.user ?? null);
        }
      } catch (error) {
        console.error("Failed to load current user", error);

        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading };
}
