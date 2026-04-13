"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";
import CartModal from "./Cart/CartModal";
import { useSelector } from "react-redux";
import { selectTotalQuantity, selectCartItems } from "@/store/cartSelectors";



export default function Navigation() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const totalQuantity = useSelector(selectTotalQuantity);
  const cartItems = useSelector(selectCartItems);



  const links = [
    { href: "/", label: "HOME" },
    { href: "/headphones", label: "HEADPHONES" },
    { href: "/speakers", label: "SPEAKERS" },
    { href: "/earphones", label: "EARPHONES" },
  ];


  function handleCartOpen() {
    if (cartItems.length === 0) return; // Prevent opening the cart if it's empty
    setCartOpen(true);
  }


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.left}>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <a href="/" className={styles.logo} aria-label="Home">
            <h1>audiommerce</h1>
          </a>
        </div>

        {/* Desktop Links */}
        <nav className={styles.nav}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={pathname === link.href ? styles.active : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className={styles.right}>
          <button className={styles.signup}>Sign Up</button>
          <button className={styles.cart} onClick={handleCartOpen}>🛒 {totalQuantity > 0 && <sup className={styles.sup}>{totalQuantity}</sup>}</button>
        </div>
      </div>

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={pathname === link.href ? styles.active : undefined}
            >
              {link.label}
            </a>
          ))}
          <button className={styles.mobileSignup}>Sign Up</button>
        </div>
      )}
    </header>
  );

}
