import styles from "./YX1Earphones.module.css";

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
        <button className={styles.button}>SEE PRODUCT</button>
      </div>
    </section>
  );
}