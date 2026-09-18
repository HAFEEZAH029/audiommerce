import Image from "next/image";
import styles from "./ProductCard.module.css";
import Link from "next/link";

interface ProductCardProps {
  images: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  category: string;
  isNew?: boolean;
  name: string;
  description: string;
  slug: string;
  reversed?: boolean;
}

export default function ProductCard({
  images,
  category,
  isNew,
  name,
  description,
  slug,
  reversed,
}: ProductCardProps) {
  return (
    <article className={`${styles.wrapper} ${reversed ? styles.reversed : ""}`}>
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <picture>
          <source media="(min-width: 1024px)" srcSet={images.desktop} />
          <source media="(min-width: 768px)" srcSet={images.tablet} />
          <Image
            src={images.mobile}
            alt={name}
            fill
            className={styles.image}
          />
        </picture>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        {isNew && <p className={styles.newProduct}>NEW PRODUCT</p>}
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.description}>{description}</p>
        <Link href={`/${category}/${slug}`} className={styles.cta}>
          SEE PRODUCT
        </Link>
      </div>
    </article>
  );
}