import { createPost, TPost, updatePost } from "@/services/postService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export const useCreatePost = () => {
  return useMutation<any, Error, TPost>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (payload) => await createPost(payload),
    onSuccess: () => {
      toast({ title: "post creation success" });
    },
    onError: (error) => {
      toast({ title: "post creation error", description: error.message });
    },
  });
};

// interface UpdatePost {
//   id: string;
//   body: Partial<TPost>
// }

export const useUpdatePost = (postId:string) => {
  return useMutation<any, Error, Partial<TPost>>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async (payload) => await updatePost(postId, payload),
    onSuccess: () => {
      toast({ title: "post update success" });
    },
    onError: (error) => {
      toast({ title: "post update error", description: error.message });
    },
  });
};
