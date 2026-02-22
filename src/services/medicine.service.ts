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
  getMedicines: async function () {
    try {
      const res = await fetch(`${API_URL}/medicines`);
      const data = await res.json();
      return { data: data, error: null };
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
