"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { env } from "@/env"
import { Cart, CartItem } from "@/types/cart.type"
import { checkout } from "@/actions/order.action"

interface CheckoutCardProps {
  cartData:Cart;
} 

export default function CheckoutCard({cartData} : CheckoutCardProps) {
  const {
    id,
    shippingAddress,
    totalPrice,
  } = cartData;

  const API_URL=env.NEXT_PUBLIC_API_URL;

const handleCheckout=async()=>{
        const toastId=toast.loading("Placing order...");
        try {
        const { data, error } = await checkout();
        console.log(data);
        if (data?.url) {
          window.location.href = data.url;
          return;
        }
        if (error) {
          toast.error("Failed to place order",{id:toastId});
          return;
        }
        toast.success("Order placed successfully",{id:toastId});
        // window.location.href = "/orders";
        } catch (error) {
        toast.error("Something went wrong, please try again.",{id:toastId});
        }
  }

  return (
    <Card className="w-80 group overflow-hidden rounded-2xl">
 
      <CardContent className="flex flex-wrap space-y-2">
        <p><span className="font-bold">Total Price:</span> Tk {totalPrice}</p>
        <p><span className="font-bold">Shipping Address:</span> {shippingAddress}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-3">
        <div>
          <p><small className="font-bold">To place an order, click the "Pay Now" button below.</small></p>
          <p><small><span className="text-red-500">*</span>By clicking "Pay Now", you agree to our terms and conditions.</small></p>
        </div>
        <Button
          className="w-full"
          onClick={()=>handleCheckout()}
        >
          Pay Now
        </Button>
      </CardFooter>
    </Card>
  )
}
