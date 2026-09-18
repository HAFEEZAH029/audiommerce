import styles from "./YX1Earphones.module.css";
import Link from "next/link";

export default function YX1Earphones() {
  return (
    <section className={styles.wrapper}>
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <img
          src="/assets/home/desktop/image-earphones-yx1.jpg"
          alt="YX1 Earphones"
          className={styles.image}
        />
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <h2>YX1 EARPHONES</h2>
        <Link href={`/earphones/yx1-earphones`} className={styles.button}>
          SEE PRODUCT
        </Link>
      </div>
    </section>
  );
}