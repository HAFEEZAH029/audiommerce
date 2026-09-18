import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* TOP */}
        <div className={styles.top}>
          <h2 className={styles.logo}>audiommerce</h2>

          <nav className={styles.nav}>
            <a href="/">HOME</a>
            <a href="/headphones">HEADPHONES</a>
            <a href="/speakers">SPEAKERS</a>
            <a href="/earphones">EARPHONES</a>
          </nav>
        </div>

        {/* DESCRIPTION */}
        <p className={styles.description}>
          Audiommerce is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our demo
          facility - we’re open 7 days a week.
        </p>

        {/* BOTTOM */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            Copyright 2026. All Rights Reserved
          </p>

          <div className={styles.socials}>
            <a href="https://facebook.com"><img src="/assets/shared/desktop/icon-facebook.svg" alt="Facebook" /></a>
            <a href="https://twitter.com"><img src="/assets/shared/desktop/icon-twitter.svg" alt="Twitter" /></a>
            <a href="https://instagram.com"><img src="/assets/shared/desktop/icon-instagram.svg" alt="Instagram" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}