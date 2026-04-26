"use server";

import { cartService } from "@/services/cart.service";
import { orderService } from "@/services/orders.service";

export const checkout = async () => {
  return await cartService.checkout();
};

export const getOrders = async () => {
  return await orderService.getOrders();
};

export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  return await orderService.updateStatus(orderId, newStatus);
};
