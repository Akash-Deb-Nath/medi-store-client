"use client"

import { useForm } from "@tanstack/react-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import * as z from "zod"
import { env } from "@/env"

const sellerSchema = z.object({
  role: z.literal("SELLER"),
  pharmacyName: z.string().min(3, "Pharmacy name must be at least 3 characters"),
  licenseNumber: z.string().min(5, "License number must be at least 5 characters"),
  phoneNumber: z.string().refine(
    (val) => val === "" || /^\+?[0-9]{10,15}$/.test(val),
    "Invalid phone number"
  ),
  dateOfBirth: z.string().refine(
    (val) => val === "" || !isNaN(Date.parse(val)),
    "Invalid date format"
  ),
  gender: z.string().refine(
    (val) => val === "" || ["Male", "Female", "Other"].includes(val),
    "Invalid gender"
  ),
  address: z.string().refine(
    (val) => val === "" || val.length >= 5,
    "Address must be at least 5 characters"
  ),
})

const API_URL=env.API_URL;

export function SellerProfileForm() {
  const form = useForm({
    defaultValues: {
      role: "SELLER",
      pharmacyName: "",
      licenseNumber: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "Male",
      address: "",
    },
    validators: {
      onSubmit: sellerSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await fetch(`${API_URL}/completeProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value), // ✅ userId পাঠানোর দরকার নেই
      })
      const data = await res.json()
      console.log("Seller profile created:", data)
      window.location.href = "/" // ✅ reload করে নতুন session reflect করবে
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
      {/* Pharmacy Name */}
      <form.Field
        name="pharmacyName"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Pharmacy Name</FieldLabel>
            <Input
              type="text"
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      {/* License Number */}
      <form.Field
        name="licenseNumber"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>License Number</FieldLabel>
            <Input
              type="text"
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      {/* Phone Number */}
      <form.Field
        name="phoneNumber"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
            <Input
              type="text"
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      {/* Date of Birth */}
      <form.Field
        name="dateOfBirth"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Date of Birth</FieldLabel>
            <Input
              type="date"
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      {/* Gender */}
      <form.Field
        name="gender"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Gender</FieldLabel>
            <select
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="border rounded p-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      {/* Address */}
      <form.Field
        name="address"
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Address</FieldLabel>
            <Input
              type="text"
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      <Button type="submit">Submit Seller Profile</Button>
    </form>
  )
}