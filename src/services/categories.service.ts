import { env } from "@/env";
import { CategoriesFormValues } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
export const categoriesService = {
  addCategories: async function (value: CategoriesFormValues) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/categories`, {
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
      console.error("Add to categories error:", error);
      return {
        data: null,
        error: { message: error.message || "Something went wrong" },
      };
    }
  },
  getCategories: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/categories`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
