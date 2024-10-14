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
  AlertDialogTitle,
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
import {
  useCheckLoginQuery,
  useForgetPasswordMutation,
  useLoginUserMutation,
} from "@/redux/api/authApi";
import { toast } from "@/hooks/use-toast";
import { CustomError } from "@/types/errorType";
import { useEffect, useRef, useState } from "react";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(4),
});

export function LoginForm() {
  const [login, { isLoading, isError, error }] = useLoginUserMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const loggedInUser = await login(data);
    if (loggedInUser.data) {
      router.push("/");
    }
    toast({ title: "Login success" });
  }
  if (isLoading) {
    toast({
      title: "Please wait...",
      description: <p>Your are logging in.</p>
    });
  }
  if (isError) {
    console.log("Error");
    toast({
      title: "Something went wrong",
      description: <p>{(error as CustomError)?.data?.message}</p>,
    });
  }

  // handle forget password
  const [sendLink] = useForgetPasswordMutation();
  const forgetPassEmailRef = useRef<HTMLInputElement>(null);
  async function forgetPasswordHandler() {
    const linkSent = await sendLink({
      email: forgetPassEmailRef.current!.value,
    });
    if (linkSent.data) {
      toast({ title: "Link sent to your email. Please check your email." });
    }
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
