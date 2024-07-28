import { useState, useEffect, createContext, ReactNode } from "react";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/firebase";
import moment from "moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string({ message: "Email obligatoire" }).email({
    message: "Email invalide",
  }),
});

interface EmailVerifContextProps {
  tempMail: string;
  timer: number;
  isLoading: boolean;
  handleSendEmail: () => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  setTempMail: (value: string) => void;
  form: any;
}

export const EmailVerifContext = createContext<
  EmailVerifContextProps | undefined
>(undefined);

export const EmailVerifProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { verifMailOpened, closeLoginModal, user } = useUser();
  const { updateVerifMail } = useAuth();
  const [timer, setTimer] = useState(0);
  const [tempMail, setTempMail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const email = user?.tempEmail || user?.email;

  useEffect(() => {
    if (verifMailOpened) {
      closeLoginModal();
      handleSendEmail();
    }
  }, [verifMailOpened]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const initTimer = () => {
    if (localStorage.getItem("verifMail")) {
      const lastEmailSent = moment(localStorage.getItem("verifMail"));
      const diff = moment().diff(lastEmailSent, "seconds");
      if (60 - diff > 0) setTimer(60 - diff);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setTempMail(values.email);
  };

  const handleSendEmail = async () => {
    const emailErrors = form.formState.errors?.email ? true : false;
    setIsLoading(true);
    const lastCodeSent = localStorage.getItem("verifMail");
    const diff = moment().diff(moment(lastCodeSent), "seconds");
    if (
      auth.currentUser &&
      (!lastCodeSent || diff > 60) &&
      !emailErrors &&
      (tempMail || email)
    ) {
      try {
        if (email !== tempMail) await updateVerifMail(tempMail);
        else await updateVerifMail();
        localStorage.setItem("verifMail", moment().format());
        toast.success("Email de vérification envoyé");
        initTimer();
      } catch (error: any) {
        form.setError("email", {
          type: "manual",
          message:
            error.response?.data?.error || "Erreur lors de l'envoi du mail",
        });
      }
    } else initTimer();
    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(() => {
    form.setValue("email", email || "");
    setTempMail(email || "");
  }, [user]);
  return (
    <EmailVerifContext.Provider
      value={{
        form,
        tempMail,
        timer,
        isLoading,
        handleSendEmail,
        onSubmit,
        setTempMail,
      }}
    >
      {children}
    </EmailVerifContext.Provider>
  );
};
