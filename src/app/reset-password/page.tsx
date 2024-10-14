"use client"
import Image from "next/image";
import React from "react";
import laughingDog from "@/assets/images/laughing-dog.jpg"
import { ChangePasswordForm } from "@/components/form/ChangePassword";
import { ResetPasswordForm } from "@/components/form/ResetPassword";
import { useSearchParams } from "next/navigation";

const page = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
  return (
    <>
      <div className="container bg-background px-5 mx-auto gap-10 h-svh flex flex-wrap justify-center items-center">
        <div className="site_logo">
            <Image className="max-h-[200px] object-cover" width={300} height={200} src={laughingDog} alt="lauging dog" />
            <h1 className="text-6xl text-primary font-bold">PTC</h1>
            <p className="text-gray-700 w-[250px]">Share your pets how you care and get others tips and stories</p>
        </div>
        <div className="login_form w-auto lg:w-[400px]">
            <ResetPasswordForm token={token} />
        </div>
      </div>
    </>
  );
};

export default page;
