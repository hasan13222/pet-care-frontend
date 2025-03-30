"use server";
import { TUserProfile } from "@/hooks/user.hooks";
import { axiosSecure } from "@/lib/axiosInstance";

export const getCurrentUserProfile = async () => {
  try {
    const { data } = await axiosSecure.get(`/api/users/me`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data } = await axiosSecure.get(`/api/users/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateProfile = async (
  payload: Partial<TUserProfile>
) => {
  try {
    const { data } = await axiosSecure.put(`/api/users/me`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};


export const followUser = async (userId: string, payload: {following: string}) => {
  try {
    const { data } = await axiosSecure.patch(`/api/users/${userId}/follow`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export type TFollow = {following: string}

export const unfollowUser = async (userId: string, payload: TFollow) => {
  try {
    const { data } = await axiosSecure.patch(`/api/users/${userId}/unfollow`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserFollowers = async (userId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_VITE_BASEAPI}/api/users/followers/${userId}`, {
      cache: "no-cache"
    });
    const followers = await res.json();
    return followers;
  } catch (error:any) {
    throw new Error(error);
  }
}

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_VITE_BASEAPI}/api/users`, {
      next: {
          revalidate: 60
      }
    });
    const users = await res.json();
    return users;
  } catch (error:any) {
    throw new Error(error);
  }
}