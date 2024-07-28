import { useContext } from "react";
import { TwoAuthContext } from "@/context/twoAuthContext";

export const useTwoAuth = () => {
  const context = useContext(TwoAuthContext);

  if (context === undefined) {
    throw new Error("useTwoAuth must be used within a twoAuthProvider");
  }
  return context;
};
