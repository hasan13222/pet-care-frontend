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
import { FaEdit } from "react-icons/fa";
import { UpdateProfileForm } from "@/components/form/ProfileUpdateForm";
import { useState } from "react";
const ProfileEditComp = ({ userInfo }: any) => {
  const [alertOpen, setAlertOpen] = useState("");
  return (
    <AlertDialog
      onOpenChange={() => setAlertOpen("open")}
      open={alertOpen === "close" ? false : undefined}
    >
      <AlertDialogTrigger asChild>
        <FaEdit className="font-light text-gray-500 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription className="overflow-auto h-[calc(100vh-100px)]">
            <UpdateProfileForm
              setAlertOpen={setAlertOpen}
              userInfo={userInfo}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProfileEditComp;
