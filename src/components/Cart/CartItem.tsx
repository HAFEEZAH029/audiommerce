"use client";

import Image from "next/image";
import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "@/store/cartSlice";
import { increaseCartItem, decreaseCartItem } from "@/lib/cart-actions";




type Props = {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
};

export default function CartItem({ item }: Props) {
  const dispatch = useDispatch();

  async function handleIncrease() {
      dispatch(increaseQuantity(item.id));

      try {
      await increaseCartItem(item.id);
    } catch (error) {
      console.error(error);
    }
  }

    async function handleDecrease() {
      dispatch(decreaseQuantity(item.id));

      try {
      await decreaseCartItem(item.id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div className={styles.imgBox}>
          <Image src={item.image} alt={item.name} fill />
        </div>

        <div className={styles.info}>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.price}>$ {item.price}</p>
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={handleDecrease}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={handleIncrease}>
          +
        </button>
      </div>
    </div>
  );
}