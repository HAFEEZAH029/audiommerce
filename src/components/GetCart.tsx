"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "@/store/cartSlice";
import { getCart } from "@/lib/cart-actions";

type Props = {
  userId: string | null;
};

export default function GetCart({ userId }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      dispatch(setCart([]));
      return;
    }

    let cancelled = false;

    async function fetchCart() {
      const items = await getCart();

      if (!cancelled) {
        dispatch(setCart(items));
      }
    }

    fetchCart();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return null;
}
