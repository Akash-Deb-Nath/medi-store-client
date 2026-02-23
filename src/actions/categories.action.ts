"use server";

import { categoriesService } from "@/services/categories.service";
import { CategoriesFormValues } from "@/types";

export const getCategories = async () => {
  const result = await categoriesService.getCategories();
  console.log(result.data);

  if (result.error) {
    return [];
  }

  return result.data ?? [];
};

export const addCategories = async (value: CategoriesFormValues) => {
  return await categoriesService.addCategories(value);
};
