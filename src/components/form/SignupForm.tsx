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
// import { useSignupUserMutation } from "@/redux/api/authApi"; 
import { toast } from "@/hooks/use-toast";
import { CustomError } from "@/types/errorType";
import axios from "axios";
import { useRef } from "react";
import { useUserSignup } from "@/hooks/auth.hooks";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  name: z.string().min(2),
  password: z.string().min(4),
  phone: z.string().optional(),
  address: z.string().optional(),
  profile_picture: z.string().optional(),
});

export function SignupForm() {
  const router = useRouter();

  const {
    mutate: handleUserSignup,
    isError,
    isPending,
    isSuccess,
    error,
  } = useUserSignup();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      profile_picture: "",
    },
  });

  const userImageFileRef = useRef<HTMLInputElement>(null);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (userImageFileRef?.current?.files instanceof FileList) {
      await axios
        .post(
          `https://api.imgbb.com/1/upload?key=787a92272c8fe84458fd69331f72c734`,
          { image: userImageFileRef?.current?.files[0] },
          {
            headers: { "content-Type": "multipart/form-data" },
          }
        )
        .then(async (imgData) => {
          const newUser = {
            ...data,
            profile_picture: imgData.data.data.display_url,
          };
          handleUserSignup(newUser);
        })
        .catch(async () => {
          handleUserSignup(data);
        });
    }
  }
  if (isPending) {
    toast({
      title: "Please wait...",
      description: <p>Your account registration is ongoing.</p>,
    });
  }
  if (isSuccess) {
    router.push("/login");
  }
  if (isError) {
    toast({
      title: "Something went wrong",
      description: <p>{error?.message}</p>,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
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
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormItem>
          <FormLabel>Profile Picture</FormLabel>
          <input
            ref={userImageFileRef}
            type="file"
            placeholder="Profile Picture"
          />
        </FormItem>
        <div className="flex justify-between">
          <Button size="lg" className="bg-primary font-bold" type="submit">
            Signup
          </Button>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <p className="text-center text-gray-500">Already Signed Up?</p>
          <Button
            onClick={() => router.push("/login")}
            type="button"
            className="bg-accent"
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
