"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Categories, OrderItem} from "@/types"
import { toast } from "sonner"
import { env } from "@/env"
import Link from "next/link"
import { Cart, CartItem } from "@/types/cart.type"

interface OrderItemCardProps {
  orderItem:OrderItem;
}

export default function OrderItemCard({orderItem} : OrderItemCardProps) {
  const {
    id,
    quantity,
    price,
    medicine
  } = orderItem;

  const API_URL=env.NEXT_PUBLIC_API_URL;

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

        <div className="flex flex-col w-full gap-3">
    <h1 className="text-lg font-bold text-blue-600">{medicine.name}</h1>
    <p className="text-sm">Price: {price} Tk</p>
    <p className="text-sm">Quantity: {quantity} pcs</p>
</div>
      </CardContent>
    </Card>
  )
}
