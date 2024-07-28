import { useState, useEffect, createContext, ReactNode } from "react";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/firebase";
import moment from "moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  code: z
    .string({ message: "Code obligatoire" })
    .length(6, {
      message: "Code invalide",
    })
    .regex(/^\d+$/, { message: "Code invalide" }),
});

interface TwoAuthContextProps {
  timer: number;
  isLoading: boolean;
  isSendLoading: boolean;
  handleSendCode: () => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const TwoAuthContext = createContext<TwoAuthContextProps | undefined>(
  undefined,
);

export const TwoAuthProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { closeLoginModal, verifTwoFactorOpened, closeTwoFactorModal, user } =
    useUser();
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendLoading, setIsSendLoading] = useState(false);
  const { sendTwoFactorAuth, validateTwoFactorAuth } = useAuth();

  useEffect(() => {
    if (verifTwoFactorOpened) {
      closeLoginModal();
      if (user?.twoFactor !== "app" && user?.twoFactor !== "sms")
        handleSendCode();
    } else closeTwoFactorModal();
  }, [verifTwoFactorOpened]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const initTimer = () => {
    if (localStorage.getItem("twoAuth")) {
      const lastCodeSent = moment(localStorage.getItem("twoAuth"));
      const diff = moment().diff(lastCodeSent, "seconds");
      if (60 - diff > 0) setTimer(60 - diff);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await validateTwoFactorAuth(values.code);
    } catch (error: any) {
      form.setError("code", {
        type: "manual",
        message: "Code invalide",
      });
      console.log(error);
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSendCode = async () => {
    if (user?.twoFactor !== "app" && !user?.valid) {
      setIsSendLoading(true);
      const lastCodeSent = localStorage.getItem("twoAuth");
      const diff = moment().diff(moment(lastCodeSent), "seconds");
      if (auth.currentUser && (!lastCodeSent || diff > 60)) {
        try {
          localStorage.setItem("twoAuth", moment().format());
          await sendTwoFactorAuth();
          toast.success("Code envoyé");
        } catch (error: any) {
          form.setError("code", {
            type: "manual",
            message:
              error.response?.data?.error || "Erreur lors de l'envoi du code",
          });
        }
      }
      initTimer();
      setIsSendLoading(false);
    }
  };

  return (
    <TwoAuthContext.Provider
      value={{
        form,
        timer,
        isLoading,
        isSendLoading,
        handleSendCode,
        onSubmit,
      }}
    >
      {children}
    </TwoAuthContext.Provider>
  );
};
