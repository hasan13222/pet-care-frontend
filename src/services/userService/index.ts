"use server"
import { axiosSecure } from "@/lib/axiosInstance";

export const getCurrentUserProfile = async () => {
  try {
    const { data } = await axiosSecure.get(`/api/users/me`);
    console.log(data)
    return data;
  } catch (error: any) {
    console.log(error)
    throw new Error(error);
  }
};
