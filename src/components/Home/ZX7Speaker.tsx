import Image from "next/image";
import styles from "./ZX7Speaker.module.css";

const images = {
  mobile: "/assets/home/mobile/image-speaker-zx7.jpg",
  tablet: "/assets/home/tablet/image-speaker-zx7.jpg",
  desktop: "/assets/home/desktop/image-speaker-zx7.jpg",
};

export default function ZX7Speaker() {
  return (
    <section className={styles.wrapper}>
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <picture>
          <source media="(min-width: 1024px)" srcSet={images.desktop} />
          <source media="(min-width: 768px)" srcSet={images.tablet} />

          <Image
            src={images.mobile}
            alt="ZX7 Speaker"
            fill
            className={styles.image}
          />
        </picture>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <h2>ZX7 SPEAKER</h2>
        <button className={styles.button}>SEE PRODUCT</button>
      </div>
    </section>
  );
}