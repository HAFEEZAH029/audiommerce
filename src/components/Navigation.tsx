"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Navigation.module.css";
import CartModal from "./Cart/CartModal";
import { useSelector } from "react-redux";
import { selectTotalQuantity, selectCartItems } from "@/store/cartSelectors";
import { useCurrentUser } from "@/util/useCurrentUser";
import { logout } from "@/lib/logout";




export default function Navigation() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const totalQuantity = useSelector(selectTotalQuantity);
  const cartItems = useSelector(selectCartItems);
  const { user, loading } = useCurrentUser();


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

  if (loading) {
    return null; // or a loading spinner
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
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? styles.active : styles.link}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className={styles.right}>
          {user ? (
            <span className={styles.user}>Hello, {user.name} <form action={logout} className={styles.logoutForm}><button className={styles.logout}>Logout</button></form></span>
          ) : (
            <Link href="/auth" className={styles.signup}>Sign Up</Link>
          )}
          <button className={styles.cart} onClick={handleCartOpen}>🛒 {totalQuantity > 0 && <sup className={styles.sup}>{totalQuantity}</sup>}</button>
        </div>
      </div>

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? styles.active : styles.link}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <form action={logout} className={styles.logoutForm}>
              <button className={styles.mobileCta}>Logout</button>
            </form>
          ) : (
            <Link href="/auth" className={styles.mobileCta}>Sign Up</Link>
          )}
        </div>
      )}
    </header>
  );

}




