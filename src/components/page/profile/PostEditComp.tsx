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

import "react-quill/dist/quill.snow.css";
import { FaEdit } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useUpdatePostMutation } from "@/redux/api/postApi";
import { toast } from "@/hooks/use-toast";
import { CustomError } from "@/types/errorType";
import { AuthContext } from "@/provider/AuthProvider";
import { useUpdatePost } from "@/hooks/post.hooks";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PostEditComp = ({ postDesc, postId }: any) => {
  const [alertOpen, setAlertOpen] = useState("");
  const [value, setValue] = useState(postDesc);

  const {user: userData} = useContext(AuthContext);

  
  const {mutate: updatePost} = useUpdatePost(postId);

  const handleChange = (val: string) => {
    setValue(val);
  };

  async function handleUpdatePost() {
    setAlertOpen("close");
    const updatedesc = { description: value };
    const updatedPost = await updatePost(updatedesc);
  }

  
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
          <AlertDialogDescription className="overflow-auto">
            <ReactQuill value={value} onChange={handleChange} />
            <div className="flex justify-between mt-5">
              <Button onClick={handleUpdatePost} size="lg" className="bg-primary font-bold" type="submit">
                Update
              </Button>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostEditComp;
