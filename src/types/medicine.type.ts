export interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  sellerId: string;
  categoryId: string;
}

export interface MedicineFormValues {
  name: string;
  manufacturer: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  categoryId: string;
}
