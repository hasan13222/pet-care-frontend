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
import { useResetPasswordMutation } from "@/redux/api/authApi";

const FormSchema = z.object({
  newPassword: z.string().min(4),
});

export function ResetPasswordForm({token}: any) {
  const [resetPassword, { isLoading, isError, error }] = useResetPasswordMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const resetPassUser = await resetPassword({postBody: data, token});
    if (resetPassUser.data) {
      router.push("/");
    }
    toast({title: "Password reset success"})
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
            Reset Password
          </Button>
        </div>
      </form>
    </Form>
  );
}
