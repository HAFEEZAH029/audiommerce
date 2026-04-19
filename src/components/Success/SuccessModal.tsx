"use client";

import Modal from "@/components/Cart/Modal";
import { useSelector} from "react-redux";
import { selectCartItems, selectTotalPrice, } from "@/store/cartSelectors";
import styles from "./SuccessModal.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};


export default function SuccessModal({ open, onClose }: Props) {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectTotalPrice);

  const firstItem = cartItems[0];
  const remainingCount = cartItems.length - 1;
  const vat = total * 0.2; // 20% VAT

  const grandTotal = total + 50 + vat;

  return (
  <Modal open={open} onClose={onClose}>
     <dialog open className={styles.dialog}>
      <div className={styles.container}>
        <div className={styles.icon}>✔</div>

        <h2>THANK YOU FOR YOUR ORDER</h2>
        <p className={styles.message}>You will receive an email confirmation shortly.</p>

        <div className={styles.summary}>
            {/* LEFT */}
            <div className={styles.left}>
                {firstItem && (
                <div className={styles.item}>
                    <Image
                    src={firstItem.image}
                    alt={firstItem.name}
                    width={50}
                    height={50}
                    />

                    <div>
                        <p className={styles.itemName}>{firstItem.name}</p>
                        <span className={styles.itemPrice}>$ {firstItem.price}</span>
                    </div>

                    <span className={styles.itemQuantity}>x{firstItem.quantity}</span>
                </div>
                )}

                    {remainingCount > 0 && (
                <p className={styles.more}>
                    and {remainingCount} other item(s)
                </p>
                    )}
            </div>

                {/* RIGHT */}
            <div className={styles.right}>
                <p>GRAND TOTAL</p>
                <h3>$ {grandTotal}</h3>
            </div>
        </div>

        <button
        className={styles.button}
        onClick={onClose}
        >
            BACK TO HOME
        </button>
      </div>
     </dialog>
 </Modal>
)}