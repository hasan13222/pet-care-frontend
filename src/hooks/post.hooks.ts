import {
  createPost,
  deletePost,
  getAllPosts,
  interactPost,
  paymentPost,
  TPost,
  updatePost,
} from "@/services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPosts = (params: any) => {
  return useQuery({
    queryKey: ["get_all_posts"],
    queryFn: async () => await getAllPosts(params),
  });
};
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

export const useUpdatePost = (postId: string) => {
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

export type TPayment = {
  accessUser: string;
};
export const usePaymentPost = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, TPayment>({
    mutationKey: ["PAYMENT_POST"],
    mutationFn: async (payload) => await paymentPost(postId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_posts"] });
      toast({ title: "post payment success" });
    },
    onError: (error) => {
      toast({ title: "post payment error", description: error.message });
    },
  });
};

interface TInteractPost {
  query: any;
  postBody: Partial<TPost>;
}
export const useInteractPost = (postId: string) => {
  const queryclient = useQueryClient();
  return useMutation<any, Error, TInteractPost>({
    mutationKey: ["INTERACT_POST"],
    mutationFn: async (payload) =>
      await interactPost(postId, payload.postBody, payload.query),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["get_all_posts"] });
      toast({ title: "post interact success" });
    },
    onError: (error) => {
      toast({ title: "post interact error", description: error.message });
    },
  });
};

export const useDeletePost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (postId) => await deletePost(postId),
    onSuccess: () => {
      toast({ title: "post delete success" });
    },
    onError: (error) => {
      toast({ title: "post delete error", description: error.message });
    },
  });
};
