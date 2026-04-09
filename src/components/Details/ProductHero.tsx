"use client";

import styles from "./ProductHero.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Product = {
  slug: string;
  name: string;
  description: string;
  price: number;
  new: boolean;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
};

export default function ProductHero({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <section className={styles.container}>
      {/* Go Back */}
      <button onClick={() => router.back()} className={styles.goBack}>
        Go Back
      </button>

      <div className={styles.wrapper}>
        {/* Image */}
        <div className={styles.imageContainer}>
          <picture>
            <source media="(min-width:1024px)" srcSet={product.image.desktop} />
            <source media="(min-width:768px)" srcSet={product.image.tablet} />
            <Image src={product.image.mobile} alt={product.name} fill className={styles.image} />
          </picture>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {product.new && <p className={styles.new}>NEW PRODUCT</p>}

          <h1>{product.name}</h1>

          <p className={styles.description}>{product.description}</p>

          <p className={styles.price}>$ {product.price}</p>

          {/* Quantity + Button (basic for now) */}
          <div className={styles.actions}>
            <div className={styles.quantity}>
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>

            <button className={styles.addToCart}>ADD TO CART</button>
          </div>
        </div>
      </div>
    </section>
  );
}