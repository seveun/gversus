import { useContext } from "react";
import { SmsVerifContext } from "@/context/smsVerifContext";

export const useSmsVerif = () => {
  const context = useContext(SmsVerifContext);

  if (context === undefined) {
    throw new Error("useSmsVerif must be used within a smsVerifProvider");
  }
  return context;
};
