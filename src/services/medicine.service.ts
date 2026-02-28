import { env } from "@/env";
import { MedicineFormValues } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
export const medicineService = {
  addMedicine: async function (value: MedicineFormValues) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify(value),
      });
      const data = await res.json();
      if (!data) {
        return {
          data: null,
          error: "Something went wrong",
        };
      }
      return { data: data, error: null };
    } catch (error: any) {
      console.error("Add to cart error:", error);
      return {
        data: null,
        error: { message: error.message || "Something went wrong" },
      };
    }
  },
  getMedicines: async function ({
    search,
    categoryId,
    price,
    manufacturer,
  }: {
    search?: string;
    categoryId?: string;
    price?: number;
    manufacturer?: string;
  }) {
    try {
      const query = new URLSearchParams();
      if (search) query.append("search", search);
      if (categoryId) query.append("categoryId", categoryId);
      if (price) query.append("price", price.toString());
      if (manufacturer) query.append("manufacturer", manufacturer);

      const res = await fetch(`${API_URL}/medicines?${query.toString()}`);
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getMedicinesBySeller: async function () {
    try {
      console.log(`${API_URL}/medicines/seller`);
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/medicines/seller`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      console.log("data", { data });
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getMedicinesById: async function (medicineId: string) {
    try {
      const res = await fetch(`${API_URL}/medicines/${medicineId}`);
      const data = await res.json();
      console.log({ data });
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
