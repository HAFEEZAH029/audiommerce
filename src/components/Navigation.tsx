"use client";

import { useState, useTransition} from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Navigation.module.css";
import CartModal from "./Cart/CartModal";
import { useSelector, useDispatch} from "react-redux";
import { selectTotalQuantity, selectCartItems } from "@/store/cartSelectors";
import { removeAll } from "@/store/cartSlice";
import { useCurrentUser } from "@/util/useCurrentUser";
import { logout } from "@/lib/logout";


type Props = {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
};


export default function Navigation({ user }: Props) {

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const totalQuantity = useSelector(selectTotalQuantity);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { loading } = useCurrentUser();
  const [isPending, startTransition] = useTransition();





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


  const handleLogout = () => {
  dispatch(removeAll());

  // 2. Execute the Server Action inside a transition
  startTransition(async () => {
    await logout();
  });
};

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
            <span className={styles.user}>Hello, {user.name} <button className={styles.logout} onClick={handleLogout} disabled={isPending}>
              {isPending ? "Logging out..." : "Logout"}
            </button></span>
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
            <button className={styles.mobileCta} onClick={handleLogout} disabled={isPending}>
              {isPending ? "Logging out..." : "Logout"}
            </button>
          ) : (
            <Link href="/auth" className={styles.mobileCta}>Sign Up</Link>
          )}
        </div>
      )}
    </header>
  );

}




