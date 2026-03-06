"use client";

import { useState } from "react";
import CartItemCard from "@/components/modules/cartPage/cartCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cart, CartItem } from "@/types/cart.type";

interface CartClientProps {
  payload: Cart;
}

export default function CartClient({ payload }: CartClientProps) {
  const [items, setItems] = useState<CartItem[]>(payload?.items ?? []);
  const [totalPrice, setTotalPrice] = useState(payload?.totalPrice ?? 0);

  const handleRemove = (id: string, price: number, quantity: number) => {
    setItems(prev => prev.filter(item => item.id !== id));

    setTotalPrice(prev => prev - price * quantity);
  };

  return (
    <div className="flex flex-col gap-10 px-5 mt-5">
      {items.length > 0 ? (
        <>
          <div className="flex justify-around items-center">
            <h1>
              <span className="font-bold">Total:</span> {totalPrice} Tk
            </h1>
            <Link href={"/checkout"}>
              <Button>Checkout</Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {items.map(item => (
              <CartItemCard
                key={item.id}
                cartItem={item}
                onRemove={(id) => handleRemove(id, item.price, item.quantity)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-5 py-10">
          <h1 className="text-xl font-bold">Your cart is empty</h1>
          <Link href={"/shop"}>
            <Button>Go to shop</Button>
          </Link>
        </div>
      )}
    </div>
  );
}