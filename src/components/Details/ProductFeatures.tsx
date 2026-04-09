import styles from "./ProductFeatures.module.css";

type Product = {
  features: string;
  includes: {
    quantity: number;
    item: string;
  }[];
};

export default function ProductFeatures({ product }: { product: Product }) {
  return (
    <section className={styles.container}>
      {/* Features */}
      <div className={styles.features}>
        <h2>FEATURES</h2>
        <p>{product.features}</p>
      </div>

      {/* In the box */}
      <div className={styles.box}>
        <h2>IN THE BOX</h2>

        <ul>
          {product.includes.map((item, index) => (
            <li key={index}>
              <span>{item.quantity}x</span> {item.item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}