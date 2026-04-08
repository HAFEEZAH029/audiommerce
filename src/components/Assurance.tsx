import Image from "next/image";
import styles from "./Assurance.module.css";

const images = {
  mobile: "/assets/shared/mobile/image-best-gear.jpg",
  tablet: "/assets/shared/tablet/image-best-gear.jpg",
  desktop: "/assets/shared/desktop/image-best-gear.jpg",
};

export default function Assurance() {
  return (
    <section className={styles.wrapper}>
      {/* TEXT */}
      <div className={styles.content}>
        <h2>
          BRINGING YOU THE <span>BEST</span> AUDIO GEAR
        </h2>

        <p>
          Located at the heart of New York City, Audiommerce is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products.
        </p>
      </div>

      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <picture>
          <source media="(min-width: 1024px)" srcSet={images.desktop} />
          <source media="(min-width: 768px)" srcSet={images.tablet} />

          <Image
            src={images.mobile}
            alt="Best Audio Gear"
            fill
            className={styles.image}
          />
        </picture>
      </div>
    </section>
  );
}