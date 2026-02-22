"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {Order} from "@/types"
import Link from "next/link"
import { useSessionContext } from "@/contexts/SessionContext"
import { UserRole } from "@/components/layout/Navbar"

interface OrderCardProps {
  order:Order;
}

export default function OrderCard({order} : OrderCardProps) {
   const user = useSessionContext();
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
        {
          user?.role===UserRole.CUSTOMER && <Link href={`/orders/${order.id}`} className="w-full">
        <Button className="w-full">
          Order Details
        </Button>
        </Link>
        }
      </CardFooter>
    </Card>
  )
}
