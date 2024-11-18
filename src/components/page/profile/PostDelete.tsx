"use client";
import { useDeletePost } from "@/hooks/post.hooks";
import { MdDelete } from "react-icons/md";
const PostDelete = ({ postId }: any) => {

  const { mutate: deletePost } = useDeletePost();

  const handleDeletePost = () => {
    deletePost(postId);
  };

  return (
    <>
      <MdDelete
        onClick={handleDeletePost}
        className="cursor-pointer text-red-500"
      />
    </>
  );
};

export default PostDelete;
