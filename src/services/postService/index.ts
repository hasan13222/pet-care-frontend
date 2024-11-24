"use server";
import { TPayment } from "@/hooks/post.hooks";
import { axiosSecure } from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export interface TPost {
  description: string;
  type: "premium" | "regular";
  category: string;
  image_attachments?: string[];
}

export const createPost = async (payload: TPost) => {
  try {
    const { data } = await axiosSecure.post("/api/posts", payload);
    revalidateTag("my-posts");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updatePost = async (postId: string, payload: Partial<TPost>) => {
  try {
    const { data } = await axiosSecure.patch(`/api/posts/${postId}`, payload);
    revalidateTag("my-posts");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const paymentPost = async (postId: string, payload: TPayment) => {
  try {
    console.log(postId, payload)
    const { data } = await axiosSecure.patch(`/api/posts/${postId}/payment`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const interactPost = async (postId: string, body: Partial<TPost>, param:any) => {
  try {
    const { data } = await axiosSecure.patch(`/api/posts/${postId}/interact`, body, {params: param});
    revalidateTag("my-posts");
    revalidateTag("user-posts");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    const { data } = await axiosSecure.delete(`/api/posts/${postId}`);
    revalidateTag("my-posts");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllPosts = async (params: any) => {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VITE_BASEAPI}/api/posts`,
      {
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VITE_BASEAPI}/api/posts/${userId}`,
      {
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { tags: ["user-posts"] },
      }
    );
    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
