import { env } from "@/env";
import { cookies } from "next/headers";
import { CustomerProfile, SellerProfile } from "@/types/user.type";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
  createCustomer: async function (payload: CustomerProfile) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/user/completeProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify(payload),
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
      console.error("Creating Customer profile error", error);
      return {
        data: null,
        error: { message: error.message || "Something went wrong" },
      };
    }
  },
  createSeller: async function (payload: SellerProfile) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/user/completeProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify(payload),
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
      console.error("Creating Seller profile error", error);
      return {
        data: null,
        error: { message: error.message || "Something went wrong" },
      };
    }
  },
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Session not found" } };
      }

      const session = await res.json();
      if (!session?.session) {
        return { data: null, error: { message: "Session is missing" } };
      }

      return { data: session, error: null };
    } catch (error) {
      console.error("Get session error:", error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getAllUsers: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/user/allUsers`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }

      const data = await res.json();
      return { data: data, error: null };
    } catch (error: any) {
      console.error("Get users error:", error);
      return {
        data: null,
        error: { message: error.message || "Something went wrong" },
      };
    }
  },
};
