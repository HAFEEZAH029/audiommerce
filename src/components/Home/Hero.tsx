import Image from "next/image";
import styles from "./Hero.module.css";
import Link from "next/link";

const images = {
  mobile: "/assets/home/mobile/image-header.jpg",
  tablet: "/assets/home/tablet/image-header.jpg",
  desktop: "/assets/home/desktop/image-hero.jpg",
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <picture>
          <source media="(min-width: 1024px)" srcSet={images.desktop} />
          <source media="(min-width: 768px)" srcSet={images.tablet} />

          <Image
            src={images.mobile}
            alt="XX99 Mark II Headphones"
            fill
            priority
            className={styles.image}
          />
        </picture>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <p className={styles.tag}>NEW PRODUCT</p>

        <h1 className={styles.title}>
          XX99 MARK II <br /> HEADPHONES
        </h1>

        <p className={styles.description}>
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>

        <Link href={`/headphones/xx99-mark-two-headphones`} className={styles.button}>
          SEE PRODUCT
        </Link>
      </div>
    </section>
  );
}