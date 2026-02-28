"use server";

import { reviewsService } from "@/services/reviews.service";
import { ReviewFormValues } from "@/types/reviews.type";

export const addReviews = async (
  medicineId: string,
  data: ReviewFormValues,
) => {
  return await reviewsService.addReviews(medicineId, data);
};

export const getReviews = async (medicineId: string) => {
  return await reviewsService.getReviews(medicineId);
};
