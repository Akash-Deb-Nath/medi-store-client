import { Medicine } from "./medicine.type";

export interface OrderItem {
  id: string;
  price: number;
  quantity: number;
  medicine: Medicine;
}

export interface Order {
  id: string;
  totalPrice: number;
  status: string;
  orderedAt: Date;
  updatedAt: Date;
  items: OrderItem[];
}
