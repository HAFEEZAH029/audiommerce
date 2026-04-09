import Image from "next/image";
import styles from "./ZX9Speaker.module.css";
import Link from "next/link";

const images = {
  mobile: "/assets/home/mobile/image-speaker-zx9.png",
  tablet: "/assets/home/tablet/image-speaker-zx9.png",
  desktop: "/assets/home/desktop/image-speaker-zx9.png",
};

export default function ZX9Speaker() {
  return (
    <section className={styles.wrapper}>
      {/* PATTERN BACKGROUND */}
      <div>
        <img
        src="/assets/home/desktop/pattern-circles.svg"
        alt="Pattern Circles"
        className={styles.pattern}
        />
      </div>

      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <picture>
          <source media="(min-width: 1024px)" srcSet={images.desktop} className={styles.image} />
          <source media="(min-width: 768px)" srcSet={images.tablet} className={styles.tab} />

          <Image
            src={images.mobile}
            alt="ZX9 Speaker"
            width={300}
            height={300}
            className={styles.image}
          />
        </picture>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <h2 className={styles.title}>ZX9 SPEAKER</h2>

        <p className={styles.description}>
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>

        <Link href={`/speakers/zx9-speaker`} className={styles.button}>
          SEE PRODUCT
        </Link>
      </div>
    </section>
  );
}