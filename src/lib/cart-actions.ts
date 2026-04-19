"use server";

import { prisma } from "./prisma";
import { getCurrentUser } from "./getUser";



export async function getCart() {
  const user = await getCurrentUser();
  if (!user) return [];

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: true, // Include product details
        },
      },
    },
  });

  // Transform to match Redux CartItem type
  return cart?.items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    image: (item.product.image as any).mobile,
    quantity: item.quantity,
  })) || [];
}


export async function addToCartDB(productId: number, quantity: number = 1) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Please login first" };
  }

  // 1. Find existing cart
  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  // 2. If no cart, create one
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: user.id,
      },
    });
  }

  // 3. Check if item already exists
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  // 4. If exists, increase quantity
  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
  } else {
    // 5. Otherwise create item
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  return { success: true };
}

export async function increaseCartItem(productId: number) {
  const user = await getCurrentUser();

  if (!user) return;

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) return;

  const item = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (!item) return;

  await prisma.cartItem.update({
    where: { id: item.id },
    data: {
      quantity: item.quantity + 1,
    },
  });
}

export async function decreaseCartItem(productId: number) {
  const user = await getCurrentUser();

  if (!user) return;

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) return;

  const item = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (!item) return;

  if (item.quantity <= 1) {
    await prisma.cartItem.delete({
      where: { id: item.id },
    });
  } else {
    await prisma.cartItem.update({
      where: { id: item.id },
      data: {
        quantity: item.quantity - 1,
      },
    });
  }
}


export async function clearCart() {
  const user = await getCurrentUser();

  if (!user) return;

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) return;

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  return { success: true };
}