"use server";

import { cookies } from "next/headers";
import { axiosPublic, axiosSecure } from "@/lib/axiosInstance";
import { jwtDecode } from "jwt-decode";

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUser = async (userData: TLoginData) => {
  try {
    const { data } = await axiosPublic.post("/api/auth/login", userData);
    if (data.success) {
      cookies().set("accessToken", data?.token);
      cookies().set("refreshToken", data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signupUser = async (payload: any) => {
  try {
    const { data } = await axiosPublic.post("/api/auth/signup", payload);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  console.log("accessToken: " + accessToken)
  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();
    if (isTokenExpired) {
      const token = await getNewAccessToken();
      cookies().set("accessToken", token);
      decodedToken = await jwtDecode(token);
      return decodedToken;
    }
    return decodedToken;
  }

  return decodedToken;
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;
    const decodedToken = jwtDecode(refreshToken as string);
    const isTokenExpired = decodedToken.exp! * 1000 < Date.now();
    if (isTokenExpired) {
      return null;
    }

    const res = await axiosPublic({
      url: "/api/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });
    return res.data?.data?.token;
  } catch (error) {
    throw new Error("Failed to get new access token" + error);
  }
};

export type TChangePassword = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

export const changeUserPassword = async (payload: TChangePassword) => {
  try {
    const { data } = await axiosSecure.post(
      "/api/auth/change-password",
      payload
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export type TResetPassword = {
  newPassword: string;
};

export const resetUserPassword = async (payload: TResetPassword) => {
  try {
    const { data } = await axiosSecure.post(
      "/api/auth/reset-password",
      payload
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const forgetUserPassword = async (payload: Pick<TChangePassword, "email">) => {
  try {
    const { data } = await axiosSecure.post(
      "/api/auth/forget-password",
      payload
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = async () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};
