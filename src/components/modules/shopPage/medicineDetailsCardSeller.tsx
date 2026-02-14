"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Medicine } from "@/types"
import { toast } from "sonner"
import { env } from "@/env"
import Link from "next/link"

interface MedicineCardProps {
  medicine: Medicine;
}

export default function MedicineDetailsCardCustomer({medicine} : MedicineCardProps) {
  const {
    name,
    manufacturer,
    price,
    stockQuantity,
    imageUrl,
    sellerId,
    categoryId
  } = medicine

  const inStock = stockQuantity > 0;

  const API_URL=env.NEXT_PUBLIC_API_URL;

  const handleAddToCart = async () => {
  try {
    const res = await fetch(`${API_URL}/cart/addToCart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicineId: medicine.id, quantity: 1 }),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to add to cart");

    toast.success(`${medicine.name} added to cart`);
  } catch (error) {
    toast.error("Something went wrong");
  }
};

  return (
    <Link href={`/shop/${medicine.id}`}>
    <Card className="group w-50 overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl">
      
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
          Manufacturer: {manufacturer}
        </p>

        <p className="text-xs text-slate-500">
          Stock: {stockQuantity}
        </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={!inStock}
          onClick={()=>handleAddToCart()}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
    </Link>
  )
}
