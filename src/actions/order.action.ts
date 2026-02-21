"use server";

import { cartService } from "@/services/cart.service";

export const checkout = async () => {
  return await cartService.checkout();
};
