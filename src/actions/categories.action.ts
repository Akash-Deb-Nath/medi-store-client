"use server";

import { categoriesService } from "@/services/categories.service";

export const getCategories = async () => {
  const result = await categoriesService.getCategories();
  console.log(result.data);

  if (result.error) {
    return [];
  }

  return result.data ?? [];
};
