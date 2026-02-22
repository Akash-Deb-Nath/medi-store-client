"use server";

import { medicineService } from "@/services/medicine.service";
import { Medicine, MedicineFormValues } from "@/types";

export const addMedicine = async (value: MedicineFormValues) => {
  return await medicineService.addMedicine(value);
};
