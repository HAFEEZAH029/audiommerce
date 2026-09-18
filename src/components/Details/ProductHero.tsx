"use client";

import styles from "./ProductHero.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch}  from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "@/store/cartSlice";
import { AppDispatch } from "@/store/redux";
import { addToCartDB } from "@/lib/cart-actions";
import { useCurrentUser } from "@/util/useCurrentUser";
import { increaseCartItem, decreaseCartItem } from "@/lib/cart-actions";




type Product = {
  id: number;
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
  const dispatch = useDispatch<AppDispatch>();//we do not necessarily need to add the AppDispatch here.
  const { user } = useCurrentUser();


  async function handleAddToCart() {
    if (!user) {
      router.push("/auth?mode=login");
      return;
    }

    dispatch(addToCart({
      id: product.id,
      name: product.name.split(" ")[0], // Just the first word for brevity
      price: product.price,
      image: product.image.mobile, // You might want to choose the image based on screen size
      quantity: 1,
    }));

    // Also add to DB
    try {
    await addToCartDB(product.id);
  } catch (error) {
    console.error(error);
  }
}

  async function handleIncrease() {
    dispatch(increaseQuantity(product.id));

    try {
    await increaseCartItem(product.id);
  } catch (error) {
    console.error(error);
  }
}

  async function handleDecrease() {
    dispatch(decreaseQuantity(product.id));

    try {
    await decreaseCartItem(product.id);
  } catch (error) {
    console.error(error);
  }
}

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
              <button onClick={handleDecrease}>-</button>
              <span>1</span>
              <button onClick={handleIncrease}>+</button>
            </div>

            <button className={styles.addToCart} onClick={handleAddToCart}>ADD TO CART</button>
          </div>
        </div>
      </div>
    </section>
  );
}