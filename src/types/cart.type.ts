import { Medicine } from "./medicine.type";

export interface CartItem {
  id: string;
  quantity: number;
  price: number;
  medicine: Medicine;
}

export interface Cart {
  id: string;
  customerId: string;
  shippingAddress: string;
  totalPrice: number;
  items: CartItem[];
}
