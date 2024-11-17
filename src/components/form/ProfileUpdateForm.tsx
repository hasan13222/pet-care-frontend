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
import { toast } from "@/hooks/use-toast";
import { CustomError } from "@/types/errorType";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useUpdateProfileMutation } from "@/redux/api/userApi";
import Image from "next/image";
import { revalidateTag } from "next/cache";
import { AuthContext } from "@/provider/AuthProvider";

const FormSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export function UpdateProfileForm({ userInfo, setAlertOpen }: any) {
  const {user: userData} = useContext(AuthContext);
  
 
  const [updateProfile, { isLoading, isError, error }] =
    useUpdateProfileMutation(userData?.data?.token);

  const userImageFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setAlertOpen("close");
    toast({
      title: "Please wait...",
      description: <p>Your profile update is ongoing.</p>,
    });
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
          const signedUpUser = await updateProfile({
            token: userData?.data?.token,
            updateInfo: newUser,
          });
          if (signedUpUser.data) {
            window.location.reload();
          }
          toast({ title: "updateProfile success" });
        })
        .catch(async () => {
          const signedUpUser = await updateProfile({
            token: userData?.data?.token,
            updateInfo: data,
          });
          if (signedUpUser.data) {
            window.location.reload();
          }
          toast({ title: "updateProfile success" });
        });
    }
  }

  if (isLoading) {
    toast({
      title: "Please wait...",
      description: <p>Your profile update is ongoing.</p>,
    });
  }
  if (isError) {
    toast({
      title: "Something went wrong",
      description: <p>{(error as CustomError)?.data?.message}</p>,
    });
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: userInfo?.name + "",
      phone: userInfo?.phone + "",
      address: userInfo?.address + "",
    },
  });
  useEffect(() => {
    if (userInfo) {
      form.reset({
        name: userInfo?.name + "",
        phone: userInfo?.phone + "",
        address: userInfo?.address + "",
      });
    }
  }, [userInfo]);
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
        <div>
          <Image
            src={userInfo?.profile_picture}
            width={200}
            height={100}
            alt="profile"
          />
        </div>
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
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
