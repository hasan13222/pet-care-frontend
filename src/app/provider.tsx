"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/provider/AuthProvider";

const queryClient = new QueryClient();
const StoreProvider = ({ children }: any) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_VITE_PAYMENT_PK as string
  );
  return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Elements stripe={stripePromise}>{children}</Elements>
        </AuthProvider>
      </QueryClientProvider>
  );
};

export default StoreProvider;
