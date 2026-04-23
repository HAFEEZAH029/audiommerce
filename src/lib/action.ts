"use server";

import { prisma } from "./prisma";
import { getCurrentUser } from "./getUser";



type FormState = {
  errors?: Record<string, string>;
  success?: boolean;
  enteredData?: Record<string, string>;
};

type CartItemWithProduct = {
  productId: number;
  quantity: number;
  product: {
    price: number;
  };
};

type CartWithItems = {
  id: string;
  items: CartItemWithProduct[];
};

export async function submitCheckout(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const errors: Record<string, string> = {};

  const user = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
    zip: formData.get("zip") as string,
    city: formData.get("city") as string,
    country: formData.get("country") as string,
    payment: formData.get("payment") as string,
    eNumber: formData.get("eNum") as string,
    ePin: formData.get("ePin") as string,
  };

  // VALIDATION


  if (!user.name || user.name.trim().length < 3) {
    errors.name = "Please enter a valid name";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.email || !emailRegex.test(user.email)) {
    errors.email = "Invalid email address";
  }

  const phoneRegex = /^[0-9+\-()\s]{7,}$/;
  if (!user.phone || !phoneRegex.test(user.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!user.address || user.address.trim().length < 7) errors.address = "Please enter a valid address";
  if (!user.zip) errors.zip = "ZIP code required";
  if (!user.city || user.city.trim().length < 3) errors.city = "Please enter a valid city";
  if (!user.country || user.country.trim().length < 4) errors.country = "Please enter a valid country";

  if (user.payment === "e-money" || user.payment === "cash") {
    if (!user.eNumber) errors.eNumber = "Enter e-Money number";
    if (!user.ePin) errors.ePin = "Enter PIN";
  }

  // RETURN ERRORS
  if (Object.keys(errors).length > 0) {
    return { errors, enteredData: user };
  }

  // SUCCESS (later: save order, clear cart, etc.)
  const currentUser = await getCurrentUser();

if (!currentUser) {
  return {
    errors: {
      auth: "Please login first",
    },
    enteredData: user,
  };
}

const cart = (await prisma.cart.findUnique({
  where: { userId: currentUser.id },
  include: {
    items: {
      include: {
        product: true,
      },
    },
  },
})) as CartWithItems | null;

if (!cart || cart.items.length === 0) {
  return {
    errors: {
      cart: "Your cart is empty",
    },
    enteredData: user,
  };
}

const grandTotal = cart.items.reduce((total: number, item: CartItemWithProduct) => {
  return total + item.product.price * item.quantity;
}, 0);

await prisma.order.create({
  data: {
    userId: currentUser.id,

    customerName: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    zip: user.zip,
    city: user.city,
    country: user.country,

    paymentMethod: user.payment,
    grandTotal,

    items: {
      create: cart.items.map((item: CartItemWithProduct) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
      })),
    },
  },
});

await prisma.cartItem.deleteMany({
  where: {
    cartId: cart.id,
  },
});

return { success: true };
}

