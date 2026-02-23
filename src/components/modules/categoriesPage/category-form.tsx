"use client"

import { useForm } from "@tanstack/react-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import * as z from "zod"
import { env } from "@/env"
import { toast } from "sonner"

import { addMedicine } from "@/actions/medicine.action"
import { addCategories } from "@/actions/categories.action"

const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  details: z.string().min(2, "Category details must be at least 2 characters"),
})


const API_URL=env.NEXT_PUBLIC_API_URL;

export function CategoryForm() {
  
  const form = useForm({
    defaultValues: {
      name: "",
      details: "",
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
        const toastId=toast.loading("Creating category");
        try {
        const { data, error } = await addCategories(value);
                if (error) {
                  toast.error("Failed to add category",{id:toastId});
                  return;
                }
        toast.success("Category created",{id:toastId});
        window.location.href="/admin/categories";
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
            <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
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

      {/* Details */}
      <form.Field
        name="details"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Details</FieldLabel>
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

      <Button type="submit">Add Category</Button>
    </form>
  )
}