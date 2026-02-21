"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {Order} from "@/types"
import { toast } from "sonner"
import { env } from "@/env"
import { Cart, CartItem } from "@/types/cart.type"
import Link from "next/link"

interface OrderCardProps {
  order:Order;
}

export default function OrderCard({order} : OrderCardProps) {
  const {
    id,
    totalPrice,
    status,
    orderedAt,
  } = order;

  return (
    <Card className="w-70 group overflow-hidden rounded-2xl">
 
      <CardContent className="flex flex-wrap space-y-2">

        <div className="flex flex-col w-full gap-3">
    <h1 className="text-lg font-bold text-blue-600"><span className="font-bold">Order:</span> #{order.id.slice(0,6)}</h1>
    <p className="text-sm"><span className="font-bold">Total Price:</span> {order.totalPrice} Tk</p>
    <p className="text-sm"><span className="font-bold">Status:</span> {order.status}</p>
    <p className="text-sm"><span className="font-bold">Ordered At:</span> {new Date(order.orderedAt).toLocaleDateString()}</p>
</div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/orders/${order.id}`}>
        <Button className="w-full">
          Order Details
        </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
