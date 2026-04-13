"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open) {
      dialog.showModal();
    }
     return () => {
      dialog.close();
    }
  }, [open]);

    if (!mounted) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      onClick={(e) => {
        // close when clicking backdrop
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")!
  );
}