import { axiosSecure } from "@/lib/axiosInstance";

export const getCurrentUser = async () => {
  try {
    const { data: user } = await axiosSecure.get("/api/auth/check-login");
    console.log(user);
    if (user) {
      const res = await fetch(`${process.env.baseApi}/api/users/me`, {
        headers: { Authorization: `Bearer ${user?.data.token}` },
        next: {
          tags: ["user"],
        },
        credentials: "include",
        cache: "no-store",
      });
      return res.json();
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data: user } = await axiosSecure.get("/auth/check-login");
    const res = await fetch(`${process.env.baseApi}/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${user?.data.token}` },
      credentials: "include",
      cache: "no-store",
    });
    return res.json();
  } catch (error) {}
  return null;
};
