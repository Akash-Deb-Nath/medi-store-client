"use client"

import { useForm } from "@tanstack/react-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import * as z from "zod"
import { env } from "@/env"
import { toast } from "sonner"

const customerSchema = z.object({
  role: z.literal("CUSTOMER"),
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

const API_URL=env.NEXT_PUBLIC_API_URL;

export function CustomerProfileForm() {
  const form = useForm({
    defaultValues: {
      role: "CUSTOMER",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "Male",
      address: "",
    },
    validators: {
      onSubmit: customerSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId=toast.loading("Creating customer profile");
        try {
          const payload = {
      ...value,
      dateOfBirth: value.dateOfBirth
        ? new Date(value.dateOfBirth).toISOString()
        : null,
    };
        const res = await fetch(`${API_URL}/user/completeProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials:"include"
      })
      const data = await res.json();
        toast.success("Customer profile created",{id:toastId})
        window.location.href = "/shop";
      } catch (error) {
        toast.error("Something went wrong, please try again.",{id:toastId});
      }
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="flex flex-col gap-4"
    >
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
              className="border-black"
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
              className="border-black"
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
              className="border-black"
            />
            {field.state.meta.errors && (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      <Button type="submit">Create Customer Profile</Button>
    </form>
  )
}