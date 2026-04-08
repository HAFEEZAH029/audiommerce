import Image from "next/image";
import styles from "./Category.module.css";
import Link from "next/link";

const categories = [
  {
    name: "HEADPHONES",
    image: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
    slug: "headphones",
  },
  {
    name: "SPEAKERS",
    image: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
    slug: "speakers",
  },
  {
    name: "EARPHONES",
    image: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
    slug: "earphones",
  },
];

export default function Category() {
  return (
    <section className={styles.wrapper}>
      {categories.map((item) => (
        <div key={item.name} className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src={item.image}
              alt={item.name}
              width={150}
              height={150}
            />
          </div>

          <h3>{item.name}</h3>

          <Link href={`/${item.slug}`} className={styles.link}>
            SHOP <span>›</span>
          </Link>
        </div>
      ))}
    </section>
  );
}