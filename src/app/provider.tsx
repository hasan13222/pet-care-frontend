"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const StoreProvider = ({ children }: any) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_VITE_PAYMENT_PK as string);
  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>{children}</Elements>
    </Provider>
  );
};

export default StoreProvider;
