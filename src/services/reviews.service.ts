import { env } from "@/env";
import { cookies } from "next/headers";
import { Review, ReviewFormValues } from "./../types/reviews.type";

const API_URL = env.API_URL;

export const reviewsService = {
  addReviews: async function (medicineId: string, value: ReviewFormValues) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/reviews/${medicineId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify(value),
      });
      const data = await res.json();
      console.log(data);
      if (!data) {
        return {
          data: null,
          error: "Something went wrong",
        };
      }
      return { data: data, error: null };
    } catch (error: any) {
      console.error("Add review error:", error);
      return {
        data: null,
        error: { message: error.message || "Something went wrong" },
      };
    }
  },
  getReviews: async function (medicineId: string) {
    try {
      const res = await fetch(`${API_URL}/reviews/${medicineId}`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
