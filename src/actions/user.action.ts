"use server";

import { userService } from "@/services/user.service";
import { CustomerProfile, SellerProfile } from "@/types/user.type";

export const getSession = async () => {
  return await userService.getSession();
};

export const createCustomer = async (payload: CustomerProfile) => {
  return await userService.createCustomer(payload);
};

export const createSeller = async (payload: SellerProfile) => {
  return await userService.createSeller(payload);
};
