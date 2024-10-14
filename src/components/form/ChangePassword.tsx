/* eslint-disable react/no-unescaped-entities */
"use client";

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
import {useChangePasswordMutation, useCheckLoginQuery,
} from "@/redux/api/authApi";
import { toast } from "@/hooks/use-toast";
import { CustomError } from "@/types/errorType";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  oldPassword: z.string().min(4),
  newPassword: z.string().min(4),
});

export function ChangePasswordForm() {
    const { data: userData } = useCheckLoginQuery(undefined);  

  
  
  const [changePassword, { isLoading, isError, error }] = useChangePasswordMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      oldPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(userData)
    const changedPassUser = await changePassword({postBody: data, token: userData?.data?.token});
    if (changedPassUser.data) {
      router.push("/");
    }
    toast({title: "Password change success"})
  }
  if (isLoading) {
    toast({
      title: "Please wait...",
      description: <p>Your Password is changing.</p>,
    });
  }
  if (isError) {
    toast({
      title: "Something went wrong",
      description: <p>{(error as CustomError)?.data?.message}</p>,
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
          name="oldPassword"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input placeholder="Old Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="New Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <div className="flex justify-between">
          <Button size="lg" className="bg-primary font-bold" type="submit">
            Change Password
          </Button>
        </div>
      </form>
    </Form>
  );
}
