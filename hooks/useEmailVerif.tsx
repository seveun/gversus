import { useContext } from "react";
import { EmailVerifContext } from "@/context/emailVerifContext";

export const useEmailVerif = () => {
  const context = useContext(EmailVerifContext);

  if (context === undefined) {
    throw new Error("useEmailVerif must be used within a emailVerifProvider");
  }
  return context;
};
