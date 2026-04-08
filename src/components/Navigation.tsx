"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

export default function Navigation() {

  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "HOME" },
    { href: "/headphones", label: "HEADPHONES" },
    { href: "/speakers", label: "SPEAKERS" },
    { href: "/earphones", label: "EARPHONES" },
  ];

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
          <button className={styles.cart}>🛒</button>
        </div>
      </div>

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
