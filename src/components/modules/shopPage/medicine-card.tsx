"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Medicine } from "@/types"
import { toast } from "sonner"
import { env } from "@/env"
import Link from "next/link"
import { cartService } from "@/services/cart.service"

interface MedicineCardProps {
  medicine: Medicine;
}

export default function MedicineCard({medicine} : MedicineCardProps) {
  const {
    name,
    manufacturer,
    price,
    stockQuantity,
    imageUrl,
  } = medicine

  const inStock = stockQuantity > 0;

  const API_URL=env.NEXT_PUBLIC_API_URL;

  const handleAddToCart=async()=>{
              const toastId=toast.loading("Adding to cart");
        try {
        const { data, error } = await cartService.addToCart(medicine.id);
        if (error) {
          toast.error(error.message,{id:toastId});
          return;
        }
        toast.success("Medicine added to cart Successfully",{id:toastId});
        } catch (error) {
                  toast.error("Something went wrong, please try again.",{id:toastId});
        }
  }

  return (
    <Card className="group w-60 overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl">
      
      <div className="relative h-48 w-full bg-slate-100">
        <Image
          src={imageUrl as string}
          alt={name}
          fill
          className="object-contain p-4 transition group-hover:scale-105"
        />

        <Badge
          className={`absolute top-3 left-3 ${
            inStock ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <CardContent className="space-y-1 p-4">

        <div className="flex gap-10">
          <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
          {name}
        </h3>

        <p className="text-lg font-bold text-blue-600">
          Tk {price}
        </p>
        </div>
        <div className="flex flex-col gap-5">

        <p className="text-xs text-slate-500">
          Stock: {stockQuantity}
        </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-3">
        <Button
          disabled={!inStock}
          onClick={()=>handleAddToCart()}
        >
          Add to Cart
        </Button>
        <Link href={`/shop/${medicine.id}`}>
        <Button>
          Details
        </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
