"use server";
import { axiosSecure } from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";

export interface TPost {
  description: string;
  type: "premium" | "regular";
  category: string;
  image_attachments?: string[];
}

export const createPost = async (payload: TPost) => {
  try {
    const { data } = await axiosSecure.post("/api/posts", payload);
    revalidateTag("my-post");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updatePost = async (postId: string, payload: Partial<TPost>) => {
  try {
    const { data } = await axiosSecure.post(`/api/posts/${postId}`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
