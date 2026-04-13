"use client";

import Image from "next/image";
import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "@/store/cartSlice";

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
        <button onClick={() => dispatch(decreaseQuantity(item.id))}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => dispatch(increaseQuantity(item.id))}>
          +
        </button>
      </div>
    </div>
  );
}