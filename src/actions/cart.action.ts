"use server";

import { cartService } from "@/services/cart.service";

export const addToCart = async (medicineId: string) => {
  return await cartService.addToCart(medicineId);
};

export const removeCartItem = async (itemId: string) => {
  return await cartService.removeCartItem(itemId);
};
