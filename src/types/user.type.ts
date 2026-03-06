import { Roles } from "./../constants/roles";
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  role?: (typeof Roles)[keyof typeof Roles];
  status?: string;
}

import type { User as BetterAuthUser } from "better-auth";

export interface CustomUser extends BetterAuthUser {
  role?: "CUSTOMER" | "ADMIN" | "SELLER";
  status?: string;
}

export type CustomerProfile = {
  role: string;
  phoneNumber: string;
  dateOfBirth: string | null;
  gender: string;
  address: string;
};

export type SellerProfile = {
  pharmacyName: string;
  licenseNumber: string;
  role: string;
  phoneNumber: string;
  dateOfBirth: string | null;
  gender: string;
  address: string;
};
