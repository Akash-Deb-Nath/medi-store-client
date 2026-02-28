import { env } from "@/env";
import { get } from "http";
import { cookies } from "next/dist/server/request/cookies";

const API_URL = env.API_URL;

export const orderService = {
  getAllOrders: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/order/allOrders`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      console.log({ data });
      return { data: data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getOrders: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/order`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      console.log({ data });
      return { data: data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getOrderById: async function (orderId: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/order/${orderId}`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      console.log({ data });
      return { data: data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
