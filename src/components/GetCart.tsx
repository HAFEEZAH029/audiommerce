"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "@/store/cartSlice";
import { getCart } from "@/lib/cart-actions";

export default function GetCart() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCart() {
      const items = await getCart();
       dispatch(setCart(items));
    }
    fetchCart();
  }, [dispatch]);

  return null;
}