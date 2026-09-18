import styles from "./ProductGallery.module.css";
import { Product } from "@/types/product";

export default function ProductGallery({ product }: { product: Product }) {
  return (
    <section className={styles.container}>
      {/* Left column */}
      <div className={styles.left}>
        <picture>
          <source media="(min-width:1024px)" srcSet={product.gallery.first.desktop} />
          <source media="(min-width:768px)" srcSet={product.gallery.first.tablet} />
          <img src={product.gallery.first.mobile} alt="gallery image 1" loading="lazy" />
        </picture>

        <picture>
          <source media="(min-width:1024px)" srcSet={product.gallery.second.desktop} />
          <source media="(min-width:768px)" srcSet={product.gallery.second.tablet} />
          <img src={product.gallery.second.mobile} alt="gallery image 2" loading="lazy" />
        </picture>
      </div>

      {/* Right column */}
      <div className={styles.right}>
        <picture>
          <source media="(min-width:1024px)" srcSet={product.gallery.third.desktop} />
          <source media="(min-width:768px)" srcSet={product.gallery.third.tablet} />
          <img src={product.gallery.third.mobile} alt="gallery image 3" loading="lazy" />
        </picture>
      </div>
    </section>
  );
}