import { env } from "@/env";

const API_URL = env.API_URL;
export const categoriesService = {
  getCatgeories: async function () {
    try {
      const res = await fetch(`${API_URL}/categories`, {
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
