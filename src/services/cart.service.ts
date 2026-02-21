import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const cartService = {
  getCart: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/cart`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      console.log(data);
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  addToCart: async function (medicineId: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify({ medicineId: medicineId, quantity: 1 }),
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
  checkout: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/order/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
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
};
