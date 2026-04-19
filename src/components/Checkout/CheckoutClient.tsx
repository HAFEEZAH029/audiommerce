"use client";

import styles from "./CheckoutClient.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectTotalPrice } from "@/store/cartSelectors";
import { removeAll } from "@/store/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { submitCheckout } from "@/lib/action";
import { useActionState, useEffect, useState } from "react";
import SuccessModal from "@/components/Success/SuccessModal";


type Props = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};


export default function CheckoutClient({ user }: Props) {

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const router = useRouter();
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);

  // Keep hook order stable across all renders.
  const initialState = {
    success: false,
    errors: {},
    enteredData: {},
  };
  const [state, formAction] = useActionState(submitCheckout, initialState);


  useEffect(() => {
    if (state?.success) {
      setShowSuccess(true);
    }
  }, [state?.success]);


  const shipping = 50;
  const vat = totalPrice * 0.2; // 20% VAT
  const grandTotal = totalPrice + shipping + vat;

  return (
    <main className={styles.container}>
      <button className={styles.goBack} onClick={() => router.back()}>
        Go Back
      </button>

      <SuccessModal
        open={showSuccess}
        onClose={() => {
          dispatch(removeAll());
          setShowSuccess(false);
          router.push("/");
        }}
      />

      <div className={styles.wrapper}>
        {/* LEFT - FORM */}
        <form id="checkout-form" className={styles.form} action={formAction}>
          <h2>CHECKOUT</h2>

          {/* BILLING */}
          <section>
            <h3>Billing Details</h3>

            <div className={styles.grid2}>
              <div>
                <input
                  name="name"
                  placeholder="Name"
                  className={styles.input}
                  defaultValue={state?.enteredData?.name}
                  required
                />
                {state?.errors?.name && (
                  <p className={styles.error}>{state.errors.name}</p>
                )}
              </div>
              <div>
                <input
                  name="email"
                  placeholder="Email Address"
                  className={styles.input}
                  defaultValue={state?.enteredData?.email}
                  required
                />
                {state?.errors?.email && (
                  <p className={styles.error}>{state.errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <input
                name="phone"
                placeholder="Phone Number"
                className={styles.inputhalf}
                defaultValue={state?.enteredData?.phone}
                required
              />
              {state?.errors?.phone && (
                <p className={styles.error}>{state.errors.phone}</p>
              )}
            </div>
          </section>

          {/* SHIPPING */}
          <section>
            <h3>Shipping Info</h3>

            <div>
              <input
                name="address"
                placeholder="Your Address"
                className={styles.inputfull}
                defaultValue={state?.enteredData?.address}
                required
              />
              {state?.errors?.address && (
                <p className={styles.error}>{state.errors.address}</p>
              )}
            </div>

            <div className={styles.grid2}>
              <div>
                <input
                  name="zip"
                  placeholder="ZIP Code"
                  className={styles.input}
                  defaultValue={state?.enteredData?.zip}
                  required
                />
                {state?.errors?.zip && (
                  <p className={styles.error}>{state.errors.zip}</p>
                )}
              </div>
              <div>
                <input
                  name="city"
                  placeholder="City"
                  className={styles.input}
                  defaultValue={state?.enteredData?.city}
                  required
                />
                {state?.errors?.city && (
                  <p className={styles.error}>{state.errors.city}</p>
                )}
              </div>
            </div>

            <div>
              <input
                name="country"
                placeholder="Country"
                className={styles.inputhalf}
                defaultValue={state?.enteredData?.country}
                required
              />
              {state?.errors?.country && (
                <p className={styles.error}>{state.errors.country}</p>
              )}
            </div>
          </section>

          {/* PAYMENT */}
          <section className={styles.paymentDetails}>
            <h3>Payment Details</h3>

            <div className={styles.paymentMethods}>
              <p>Payment Method</p>

              <div className={styles.payment}>
                <label>
                  <input type="radio" name="payment" value="e-money" defaultChecked />
                  e-Money
                </label>

                <label>
                  <input type="radio" name="payment" value="cash" />
                  Cash on Delivery
                </label>
              </div>
            </div>

            <div className={styles.grid2}>
              <div className={styles.eMoneyFields}>
                <label>e-Money Number</label>
                <div>
                  <input
                    name="eNum"
                    placeholder="e-Money Number"
                    className={styles.input}
                    type="text"
                    defaultValue={state?.enteredData?.eNumber}
                    required
                  />
                  {state?.errors?.eNumber && (
                    <p className={styles.error}>{state.errors.eNumber}</p>
                  )}
                </div>
              </div>

              <div className={styles.eMoneyFields}>
                <label>e-Money PIN</label>
                <div>
                  <input
                    name="ePin"
                    placeholder="e-Money PIN"
                    className={styles.input}
                    type="text"
                    defaultValue={state?.enteredData?.ePin}
                    required
                  />
                  {state?.errors?.ePin && (
                    <p className={styles.error}>{state.errors.ePin}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </form>

        {/* RIGHT - SUMMARY */}
        <div className={styles.summary}>
          <h3>Summary</h3>

          {cartItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <Image
                src={item.image}
                alt={item.name}
                width={50}
                height={50}
                className={styles.itemImage}
              />

              <div className={styles.itemDetails}>
                <p>{item.name}</p>
                <span>$ {item.price}</span>
              </div>

              <span className={styles.itemQuantity}>x{item.quantity}</span>
            </div>
          ))}

          {state?.errors?.cart && (
            <p className={styles.carterror}>{state.errors.cart}</p>
          )}

          <div className={styles.totals}>
            <p>
              Total <span style={{ fontWeight: "bold" }}>$ {totalPrice}</span>
            </p>
            <p>
              Shipping <span style={{ fontWeight: "bold" }}>$ {shipping}</span>
            </p>
            <p>
              VAT (Included) <span style={{ fontWeight: "bold" }}>$ {vat.toFixed(2)}</span>
            </p>
            <p className={styles.grand}>
              Grand Total <span>$ {grandTotal}</span>
            </p>
          </div>

          <button className={styles.payBtn} type="submit" form="checkout-form">
            CONTINUE & PAY
          </button>
        </div>
      </div>
    </main>
  );
}