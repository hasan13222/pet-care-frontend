"use client";
import { toast } from "@/hooks/use-toast";
import { useCheckLoginQuery } from "@/redux/api/authApi";
import { useDeletePostMutation } from "@/redux/api/postApi";
import { CustomError } from "@/types/errorType";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
const PostDelete = ({ postId }: any) => {
    const { data: userData } = useCheckLoginQuery(undefined);  

  

 

  const [deletePost, { isError, error }] = useDeletePostMutation(userData);

  const handleDeletePost = async () => {
    const deletedPost = await deletePost({
      token: userData.data.token,
      postId: postId,
    });
    if (deletedPost.data) {
      toast({ title: "Post deleted successfully" });
    }
  };

  if (isError) {
    toast({
      title: "Something went wrong",
      description: (error as CustomError).data.message,
    });
  }
  return (
    <>
      <MdDelete onClick={handleDeletePost} className="cursor-pointer text-red-500" />
    </>
  );
};

export default PostDelete;
