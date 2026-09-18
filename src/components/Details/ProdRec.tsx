import styles from "./ProdRec.module.css";
import Link from "next/link";
import { Product } from "@/types/product";

export default function ProdRec({
  product,
}: {
  product: Product;
}) {
  return (
    <section className={styles.container}>
      <h2>YOU MAY ALSO LIKE</h2>

      <div className={styles.grid}>
        {product.others.map((item) => (
          <div key={item.slug} className={styles.card}>
            <picture>
              <source media="(min-width:1024px)" srcSet={item.image.desktop} />
              <source media="(min-width:768px)" srcSet={item.image.tablet} />
              <img src={item.image.mobile} alt={item.name} loading="lazy" />
            </picture>

            <h3>{item.name}</h3>

            <Link href={`/${product.category}/${item.slug}`}>
              <button>SEE PRODUCT</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}