"use client";

import Modal from "./Modal";
import styles from "./CartModal.module.css";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
} from "@/store/cartSelectors";
import { removeAll } from "@/store/cartSlice";
import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartModal({ open, onClose }: Props) {
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQuantity = useSelector(selectTotalQuantity);

  const dispatch = useDispatch();

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2>CART ({totalQuantity})</h2>
          <button onClick={() => dispatch(removeAll())}>
            Remove all
          </button>
        </div>

        {/* Close button (your addition 👇) */}
        <button className={styles.closeBtn} onClick={onClose}>
          close
        </button>

        {/* Items */}
        <div className={styles.items}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Footer */}
        <div className={styles.total}>
            <span>TOTAL</span>
            <p>$ {totalPrice}</p>
        </div>

        <Link href="/checkout" className={styles.checkout} onClick={onClose}>CHECKOUT</Link>
      </div>
    </Modal>
  );
}