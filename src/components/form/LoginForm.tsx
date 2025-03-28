/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { CustomError } from "@/types/errorType";
import { useEffect, useRef, useState } from "react";
import { useUserForgetPassword, useUserLogin } from "@/hooks/auth.hooks";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(4),
});

export function LoginForm() {
  // const [login, { isLoading, isError, error }] = useLoginUserMutation();

  const { mutate: handleUserLogin, isPending } = useUserLogin();

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "jamil83055@gmail.com",
      password: "123456",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleUserLogin(data);
  }
  if (isPending) {
    toast({
      title: "Please wait...",
      description: <p>Your are logging in.</p>,
    });
  }

  // handle forget password
  const { mutate: sendLink } = useUserForgetPassword();
  const forgetPassEmailRef = useRef<HTMLInputElement>(null);
  function forgetPasswordHandler() {
    sendLink({
      email: forgetPassEmailRef.current!.value,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <div className="flex justify-between">
          <Button size="lg" className="bg-primary font-bold" type="submit">
            Login
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="link">
                Forget Password?
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogDescription>
                  <FormLabel>
                    Provide your email to get link to reset your password.
                  </FormLabel>
                  <FormControl className="mt-1">
                    <Input
                      type="email"
                      ref={forgetPassEmailRef}
                      placeholder="Email"
                    />
                  </FormControl>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={forgetPasswordHandler}>
                  Forget Password
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <p className="text-center text-gray-500">
            Don't have an account yet?
          </p>
          <Button
            onClick={() => router.push("/signup")}
            type="button"
            className="bg-accent"
          >
            Create Account
          </Button>
        </div>
      </form>
    </Form>
  );
}
