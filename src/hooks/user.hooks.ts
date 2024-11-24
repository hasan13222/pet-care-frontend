import {
  followUser,
  getCurrentUserProfile,
  TFollow,
  unfollowUser,
  updateProfile,
} from "@/services/userService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ["get_my_profile"],
    queryFn: async () => await getCurrentUserProfile(),
  });
};

export interface TUserProfile {
  name: string;
  phone: string;
  address: string;
  profile_picture: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, Partial<TUserProfile>>({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: async (payload) => await updateProfile(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_my_profile"] });
      toast({ title: "post update success" });
    },
    onError: (error) => {
      toast({ title: "post update error", description: error.message });
    },
  });
};

export const useFollowUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, TFollow>({
    mutationKey: ["user_follow"],
    mutationFn: async (payload) => await followUser(userId, payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["get_my_profile"] });
      toast({ title: "following success" });      
    },
    onError: (error) => {
      toast({ title: "following error", description: error.message });
    },
  });
};

export const useUnFollowUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, TFollow>({
    mutationKey: ["user_unfollow"],
    mutationFn: async (payload) => await unfollowUser(userId, payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["get_my_profile"] });
      toast({ title: "unfollow success" });     
    },
    onError: (error) => {
      toast({ title: "unfollow error", description: error.message });
    },
  });
};
