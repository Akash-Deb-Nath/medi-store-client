import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Medicine } from "@/types"


export default function MedicineCard(medicine : Medicine) {
  const {
    name,
    manufacturer,
    price,
    stockQuantity,
    imageUrl,
  } = medicine

  const inStock = stockQuantity > 0

  return (
    <Card className="group overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl">
      
      {/* IMAGE */}
      <div className="relative h-48 w-full bg-slate-100">
        <Image
          src={imageUrl || "/placeholder-medicine.png"}
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

      {/* CONTENT */}
      <CardContent className="space-y-2 p-4">
        <p className="text-xs text-slate-500">
          {manufacturer}
        </p>

        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
          {name}
        </h3>

        <p className="text-lg font-bold text-blue-600">
          ৳ {price}
        </p>

        <p className="text-xs text-slate-500">
          Stock: {stockQuantity}
        </p>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={!inStock}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
