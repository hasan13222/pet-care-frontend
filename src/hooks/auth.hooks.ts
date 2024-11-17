import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { changeUserPassword, forgetUserPassword, loginUser, resetUserPassword, signupUser, TChangePassword, TLoginData, TResetPassword } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";


export const useUserLogin = () => {
  const {setUser} = useContext(AuthContext);
  const router = useRouter();
  return useMutation<any, Error, TLoginData>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (data) => {
      toast({ title: "Login success" });
      setUser({...data.data});
      router.push('/');
    },
    onError: (error) => {
      toast({ title: "Login error", description: error.message });
    },
  });
};

export const useUserSignup = () => {
  return useMutation<any, Error, TLoginData>({
    mutationKey: ["USER_SIGNUP"],
    mutationFn: async (userData) => await signupUser(userData),
    onSuccess: () => {
      toast({ title: "signup success" });
    },
    onError: (error) => {
      toast({ title: "signup error", description: error.message });
    },
  });
};


export const useUserChangePassword = () => {
  const router = useRouter();
  return useMutation<any, Error, TChangePassword>({
    mutationKey: ["USER_CHANGE_PASSWORD"],
    mutationFn: async (payload) => await changeUserPassword(payload),
    onSuccess: () => {
      router.push('/');
      toast({ title: "change password success" });
    },
    onError: (error) => {
      toast({ title: "change password error", description: error.message });
    },
  });
}

export const useUserResetPassword = () => {
  const router = useRouter();
  return useMutation<any, Error, TResetPassword>({
    mutationKey: ["USER_RESET_PASSWORD"],
    mutationFn: async (payload) => await resetUserPassword(payload),
    onSuccess: () => {
      router.push('/');
      toast({ title: "reset password success" });
    },
    onError: (error) => {
      toast({ title: "reset password error", description: error.message });
    },
  });
}

export const useUserForgetPassword = () => {
  return useMutation<any, Error, Pick<TChangePassword, "email">>({
    mutationKey: ["USER_FORGET_PASSWORD"],
    mutationFn: async (payload) => await forgetUserPassword(payload),
    onSuccess: () => {
      toast({ title: "Link sent to your email. Please check your email." });
    },
    onError: (error) => {
      toast({ title: "forget password error", description: error.message });
    },
  });
}