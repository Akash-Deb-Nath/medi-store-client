"use server";

import { medicineService } from "@/services/medicine.service";
import { MedicineFormValues } from "@/types";

export const addMedicine = async (value: MedicineFormValues) => {
  return await medicineService.addMedicine(value);
};

export const getMedicines = async ({
  search,
  categoryId,
  price,
  manufacturer,
}: {
  search?: string;
  categoryId?: string;
  price?: number;
  manufacturer?: string;
}) => {
  return await medicineService.getMedicines({
    search,
    categoryId,
    price,
    manufacturer,
  });
};
