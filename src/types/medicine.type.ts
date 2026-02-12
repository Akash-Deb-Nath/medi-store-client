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
