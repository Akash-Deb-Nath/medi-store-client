"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { toast } from "sonner"

const formSchema=z.object({
  email:z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
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
    const toastId=toast.loading("Logging in user");
      try {
        const {data,error}=await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message,{id:toastId});
          return;
        }
        toast.success("User Logged in Successfully",{id:toastId});
        window.location.href = "/";
      } catch (error) {
        toast.error("Something went wrong, please try again.",{id:toastId});
      }
  }
})
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
          <form  id="login-form" onSubmit={(e)=>{
          e.preventDefault();
          form.handleSubmit();
        }}>
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
                 <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/register">Register</Link>
                </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
        <Button form="login-form" type="submit" className="w-full">Login</Button>
        <Button onClick={()=>handleGoogleLogin()} variant="outline" type="button"  className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
