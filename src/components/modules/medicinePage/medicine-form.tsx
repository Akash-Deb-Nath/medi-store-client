"use client"

import { useForm } from "@tanstack/react-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import * as z from "zod"
import { env } from "@/env"
import { toast } from "sonner"
import { getCategories } from "@/actions/categories.action"
import { useEffect, useState } from "react"
import { MedicineFormValues } from "@/types"
import { addMedicine } from "@/actions/medicine.action"

const medicineSchema = z.object({
  name: z.string().min(2, "Medicine name must be at least 2 characters"),
  manufacturer: z.string().min(2, "Manufacturer name must be at least 2 characters"),
  price: z.string().refine(val => !isNaN(Number(val)), "Price must be a number"),
  stockQuantity: z.string().refine(val => !isNaN(Number(val)), "Stock must be a number"),
  imageUrl: z.string()
  .refine((val) => val === "" || z.url().safeParse(val).success, "Must be a valid URL"),
  categoryId: z.string().min(1, "Category is required"),
})


const API_URL=env.NEXT_PUBLIC_API_URL;

export function MedicineForm() {
const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result ?? []);
    };
    fetchCategories();
  }, []);
  
  const form = useForm({
    defaultValues: {
      name: "",
      manufacturer: "",
      price: "",
      stockQuantity: "",
      imageUrl: "",
      categoryId: "",
    },
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
              const payload: MedicineFormValues = {
            name: value.name,
            manufacturer: value.manufacturer,
            price: Number(value.price),
            stockQuantity: Number(value.stockQuantity),
            imageUrl: value.imageUrl,
            categoryId: value.categoryId,
          };
          console.log(payload);

        const toastId=toast.loading("Creating medicine");
        try {
        const { data, error } = await addMedicine(payload);
                if (error) {
                  toast.error("Failed to add medicine",{id:toastId});
                  return;
                }
        toast.success("Medicine created",{id:toastId});
        window.location.href="/seller/medicines";
        } catch (error) {
            toast.error("Something went wrong, please try again.",{id:toastId});
        }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="flex flex-col gap-4"
    >
      {/* Medicine Name */}
      <form.Field
        name="name"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Medicine Name</FieldLabel>
            <Input
              type="text"
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="border-black"
            />
            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      {/* Manufacturer */}
      <form.Field
        name="manufacturer"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Manufacturer</FieldLabel>
            <Input
              type="text"
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="border-black"
            />
            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      {/* Price */}
      <form.Field
        name="price"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Price</FieldLabel>
            <Input
              type="number"
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="border-black"
            />
            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      {/* Stock Quantity */}
      <form.Field
        name="stockQuantity"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Stock Quantity</FieldLabel>
            <Input
              type="number"
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="border-black"
            />
            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      {/* Image URL */}
      <form.Field
        name="imageUrl"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
            <Input
              type="text"
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="border rounded p-2"
            />            
            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      {/* Category ID */}
      <form.Field
        name="categoryId"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Category</FieldLabel>
            <select
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="border rounded p-2"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      <Button type="submit">Add Medicine</Button>
    </form>
  )
}