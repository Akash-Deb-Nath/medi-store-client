"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CartItem } from "@/types/cart.type";
import { Trash } from "lucide-react";
import { removeCartItem } from "@/actions/cart.action";

interface CartItemCardProps {
  cartItem: CartItem;
  onRemove: (id: string) => void;
}

export default function CartItemCard({ cartItem, onRemove }: CartItemCardProps) {
  const { id, quantity, price, medicine } = cartItem;

  const handleRemove = async () => {
    try {
      const { data, error } = await removeCartItem(id);

      if (data === null) throw new Error("Failed to remove item from cart");

      toast.success(`Removed from the cart`);
      onRemove(id);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="w-70 group overflow-hidden rounded-2xl">
      <CardContent className="flex flex-wrap space-y-2">
        <div className="relative h-48 w-full">
          <Image
            src={medicine.imageUrl as string}
            alt={medicine.name}
            fill
            className="object-contain p-4"
          />
        </div>

        <div className="flex justify-around items-center w-full">
          <div>
            <h1 className="text-lg font-bold text-blue-600">{medicine.name}</h1>
            <p className="text-sm">Price: {price} Tk</p>
            <p className="text-sm">Quantity: {quantity} pcs</p>
          </div>
          <div>
            <Button
              variant="outline"
              className="border-0"
              onClick={handleRemove}
            >
              <Trash /> Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}