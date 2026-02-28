"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Medicine } from "@/types"
import { toast } from "sonner"
import { env } from "@/env"
import Link from "next/link"
import { useEffect, useState } from "react"
import { addToCart } from "@/actions/cart.action"
import { addReviews, getReviews } from "@/actions/reviews.action"
import * as z from "zod"
import { useForm } from "@tanstack/react-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Review, ReviewFormValues } from "@/types/reviews.type"

interface MedicineCardProps {
  medicine: Medicine;
}

const reviewSchema = z.object({
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  comment: z.string().refine(
    (val) => val === "" || val.length >= 1,
    "Comment must be at least 5 characters"
  ),
})

export default function MedicineDetailsCardCustomer({ medicine }: MedicineCardProps) {
  const {
    name,
    manufacturer,
    price,
    stockQuantity,
    imageUrl,
  } = medicine

  const inStock = stockQuantity > 0;

  const API_URL = env.NEXT_PUBLIC_API_URL;

  const handleAddToCart = async () => {
    const toastId = toast.loading("Adding to cart");
    try {
      const { data, error } = await addToCart(medicine.id);
      if (error) {
        toast.error("Failed to add cart", { id: toastId });
        return;
      }
      if (data?.success === false) {
        toast.error(data.message, { id: toastId });
        return;
      }
      toast.success("Medicine added to cart Successfully", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong, please try again.", { id: toastId });
    }
  }

  const [reviews, setReviews] = useState<Review[]>([]);


  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await getReviews(medicine.id);
      if (error) {
        toast.error("Failed to fetch reviews");
        return;
      }
      setReviews(data);
    };
    fetchReviews();
  }, [medicine.id]);

  const form = useForm({
    defaultValues: {
      rating: 0,
      comment: ""
    },
    validators: {
      onSubmit: reviewSchema,
    },
    onSubmit:
      async ({ value }) => {
        const toastId = toast.loading("Adding review...");
        console.log(value);
        try {
          const { data, error } = await addReviews(medicine.id, value);
          if (error || data?.success === false) {
            toast.error(data?.message || "Failed to add review", { id: toastId });
            return;
          }
          console.log(data);
          if (data) {
            setReviews(prev => [...prev, data]);
          }
          form.reset();
          toast.success("Review added successfully", { id: toastId });
        } catch (error) {
          toast.error("Something went wrong", { id: toastId });
        }
      }
  })

  return (
    <Card className="group w-100 overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl">

      <div className="relative h-48 w-full bg-slate-100">
        <Image
          src={imageUrl as string}
          alt={name}
          fill
          className="object-contain p-4 transition group-hover:scale-105"
        />

        <Badge
          className={`absolute top-3 left-3 ${inStock ? "bg-green-600" : "bg-red-600"
            }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <CardContent className="flex flex-col gap-3 space-y-1 p-4">

        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
          {name}
        </h3>

        <p className="text-lg font-bold text-blue-600">
          Tk {price}
        </p>
        <p className="text-xs text-slate-500">
          Manufacturer: {manufacturer}
        </p>

        <p className="text-xs text-slate-500">
          Stock Quantity: {stockQuantity}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-5 p-4 pt-0">
        <Button
          className="w-full"
          disabled={!inStock}
          onClick={() => handleAddToCart()}
        >
          Add to Cart
        </Button>
        <div className="mt-4">
          <h4 className="font-semibold">Reviews</h4>

          <div className="flex flex-col gap-2 my-5">
            <form id="review-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="flex flex-col gap-3 mt-3 w-80"
            >
              <FieldGroup>
                <form.Field
                  name="rating"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Rating</FieldLabel>
                        <select
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(Number(e.target.value))}
                          className="border rounded px-2 py-1"
                        >
                          <option value={0}>Select rating</option>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="comment"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Comment</FieldLabel>
                        <textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full border rounded px-2 py-1"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </form>
            <Button form="review-form" type="submit">Submit</Button>

          </div>
          <ul>
            {reviews && reviews.map((review, index) => (
              <Card key={index} className="my-3 w-full">
                <CardContent className="flex items-center gap-3">
                  <Image
                    src={review.customer.user.image as string || "/ProfilePicture.png"}
                    alt={review.customer.user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="flex justify-around items-end w-full">
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold">{review.customer.user.name}</p>
                      <p className="text-xs text-slate-700">{review.comment}</p>
                    </div>
                    <div>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ul>
        </div>
      </CardFooter>
    </Card>
  )
}
