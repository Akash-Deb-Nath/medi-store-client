"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from '@tanstack/react-form';
import Link from "next/link";
import { toast } from "sonner";
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  imageUrl: z.string()
  .refine((val) => val === "" || z.url().safeParse(val).success, "Must be a valid URL"),
  phoneNumber: z.string()
  .refine((val) => val === "" || /^\+?[0-9]{10,15}$/.test(val), "Invalid phone number"),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const handleGoogleLogin=async()=>{
      const data= await authClient.signIn.social({
        provider:"google",
        callbackURL:"http://localhost:3000/"
      })
    }
  const form=useForm({
    defaultValues:{
      name:"",
      email:"",
      password:"",
      imageUrl:"",
      phoneNumber:"",
    },
    validators:{
      onSubmit: formSchema,
    },
    onSubmit:async({value})=>{
      const toastId=toast.loading("Creating user");
      try {
        const {data,error}=await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message,{id:toastId});
          return;
        }
        toast.success("User Created Successfully",{id:toastId});
        window.location.href = "/userProfile";
      } catch (error) {
        toast.error("Something went wrong, please try again.",{id:toastId});
      }
    }
  });
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={(e)=>{
          e.preventDefault();
          form.handleSubmit();
        }}>
          <FieldGroup>
            <form.Field
            name="name" children={(field)=>{
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return(
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                  type="text"
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
            <form.Field
            name="imageUrl" children={(field)=>{
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return(
                <Field>
                  <FieldLabel htmlFor={field.name}>Image Url</FieldLabel>
                  <Input
                  type="text"
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
                              Already registered? <Link href="/login">Login</Link>
                            </FieldDescription>
            
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
        <Button form="register-form" type="submit" className="w-full">Register</Button>
        <Button onClick={()=>handleGoogleLogin()} variant="outline" type="button" className="w-full *:">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Register with Google
            </Button>
      </CardFooter>
    </Card>
  )
}
