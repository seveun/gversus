import { useState, useEffect, createContext, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/firebase";
import moment from "moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

interface SmsVerifContextProps {
  timer: number;
  isLoading: boolean;
  isSendLoading: boolean;
  handleSendSms: () => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  closeModal: () => void;
  openModal: () => void;
  form: any;
}

export const SmsVerifContext = createContext<SmsVerifContextProps | undefined>(
  undefined,
);

export const SmsVerifProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendLoading, setIsSendLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { sendSms, validateSms } = useAuth();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const initTimer = () => {
    if (localStorage.getItem("smsVerif")) {
      const lastCodeSent = moment(localStorage.getItem("smsVerif"));
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
      await validateSms(values.code);
      setIsOpen(false);
    } catch (error: any) {
      form.setError("code", {
        type: "manual",
        message: "Code invalide",
      });
      console.log(error);
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSendSms = async () => {
    setIsSendLoading(true);
    const lastCodeSent = localStorage.getItem("smsVerif");
    const diff = moment().diff(moment(lastCodeSent), "seconds");
    if (auth.currentUser && (!lastCodeSent || diff > 60)) {
      try {
        localStorage.setItem("smsVerif", moment().format());
        await sendSms();
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
  };

  return (
    <SmsVerifContext.Provider
      value={{
        isOpen,
        closeModal: () => setIsOpen(false),
        openModal: () => setIsOpen(true),
        form,
        timer,
        isLoading,
        setIsOpen,
        isSendLoading,
        handleSendSms,
        onSubmit,
      }}
    >
      {children}
    </SmsVerifContext.Provider>
  );
};
