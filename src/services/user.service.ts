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

  getAllUsers: async function (page: number = 1, limit: number = 10) {
    try {
      const cookieStore = await cookies();

      // ক্যালকুলেট skip
      const skip = (page - 1) * limit;

      // কুয়েরি প্যারামিটারসহ URL তৈরি করুন
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        skip: skip.toString(),
        sortBy: "createdAt", // আপনি চাইলে এগুলোও ডাইনামিক করতে পারেন
        sortOrder: "desc",
      });

      const res = await fetch(
        `${API_URL}/user/allUsers?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }

      const result = await res.json();

      // ব্যাকএন্ড যদি সরাসরি { data, pagination } পাঠায় তবে সেটাই রিটার্ন করুন
      return {
        data: result.data,
        pagination: result.pagination,
        error: null,
      };
    } catch (error: any) {
      console.error("Get users error:", error);
      return {
        data: [],
        pagination: { totalPages: 1, total: 0, page: 1 },
        error: { message: error.message || "Something went wrong" },
      };
    }
  },
};
