"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Categories} from "@/types"
import { toast } from "sonner"
import { env } from "@/env"
import Link from "next/link"

interface CategoriesCardProps {
  category: Categories;
}

export default function CategoriesCard({category} : CategoriesCardProps) {
  const {
    name,
    details
  } = category

  const API_URL=env.NEXT_PUBLIC_API_URL;

  const handleEdit = async () => {
  try {
    const res = await fetch(`${API_URL}/cart/addToCart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicineId: medicine.id, quantity: 1 }),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to add to cart");

    toast.success(` added to cart`);
  } catch (error) {
    toast.error("Something went wrong");
  }
};

  return (
    <Card className="group w-50 overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl">

      <CardContent className="space-y-2 p-4">

        <h1 className="text-lg font-bold text-blue-600">
          {name}
        </h1>
        <p>
          {details}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={()=>handleEdit()}
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}
