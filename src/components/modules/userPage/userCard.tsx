"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { env } from "@/env"
import { User } from "@/types/user.type"
import Image from "next/image"

interface UserCardProps {
  user: User;
}

export default function UserCard({user} : UserCardProps) {
  const {
    name,
    email,
    image,
    role,
    status
  } = user

  const API_URL=env.NEXT_PUBLIC_API_URL;

//   const handleEdit = async () => {
//   try {
//     const res = await fetch(`${API_URL}/cart/addToCart`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ medicineId: medicine.id, quantity: 1 }),
//       credentials: "include",
//     });

//     if (!res.ok) throw new Error("Failed to add to cart");

//     toast.success(` added to cart`);
//   } catch (error) {
//     toast.error("Something went wrong");
//   }
// };

  return (
    <Card className="group w-50 overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl">
      {/* <Image
                src={image as string}
                alt={name}
                fill
                className="object-contain p-4 transition group-hover:scale-105"
              /> */}

      <CardContent className="space-y-2 p-4">

        <h1 className="text-lg font-bold text-blue-600">
          {name}
        </h1>
        <p>
          {email}
        </p>
        <p>
          {role}
        </p>
        <p>
          {status}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}
