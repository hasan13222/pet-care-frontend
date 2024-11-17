import { getCurrentUserProfile } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ["get_my_profile"],
    queryFn: async () => await getCurrentUserProfile(),
  });
};
