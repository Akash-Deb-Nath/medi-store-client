"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import * as z from "zod"
import { useForm } from "@tanstack/react-form"

const formSchema=z.object({
  email:z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

const form=useForm({
  defaultValues:{
    email:"",
    password:"",
  },
  validators:{
    onSubmit: formSchema,
  },
  onSubmit:
  async({value})=>{
    console.log(value);
  }
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleGoogleLogin=async()=>{
    const data= await authClient.signIn.social({
      provider:"google",
      callbackURL:"http://localhost:3000/"
    })
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <form.Field
            name="email" children={(field)=>{
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return(
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e)=>{field.handleChange(e.target.value)}}
                  />
                  {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                </Field>
              )
            }}
            />
            <form.Field
            name="password" children={(field)=>{
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return(
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e)=>{field.handleChange(e.target.value)}}
                  />
                  {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                </Field>
              )
            }}
            />
            <Button onClick={()=>handleGoogleLogin()} variant="outline" type="button">
                  Login with Google
                </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
