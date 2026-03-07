"use server";

import { categoriesService } from "@/services/categories.service";
import { CategoriesFormValues } from "@/types";

export const addCategories = async (value: CategoriesFormValues) => {
  return await categoriesService.addCategories(value);
};

export const getCategories = async () => {
  const result = await categoriesService.getCategories();

  if (result.error) {
    return [];
  }

  return result.data ?? [];
};

export const EditCategories = async (id: string, details: string) => {
  const result = await categoriesService.EditCategories(id, details);

  if (result.error) {
    return null;
  }

  return result.data ?? null;
};

export const DeleteCategories = async (id: string) => {
  const result = await categoriesService.DeleteCategories(id);

  if (result.error) {
    return null;
  }

  return result.data ?? null;
};
