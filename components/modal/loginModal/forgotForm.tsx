import MailIcon from "@/components/ui/icons/mailIcon";
import ArrowIcon from "@/components/ui/icons/arrowIcon";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Loader from "@/components/ui/loader";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as AuthService from "@/services/auth.service";
import { useTranslation } from "next-i18next";

const ForgotForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const { t } = useTranslation("modals");

  const formSchema = z.object({
    email: z
      .string({ message: t("modal.login.email.mandatory") })
      .email({ message: t("modal.login.password.error") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const emailErrors = form.formState.errors?.email ? true : false;

  useEffect(() => {
    initTimer();
  }, []);

  const sendForgotPassword = async (email: string) => {
    setIsLoading(true);
    const lastCodeSent = localStorage.getItem("forgotPassword");
    const diff = moment().diff(moment(lastCodeSent), "seconds");
    if ((!lastCodeSent || diff > 60) && !emailErrors && email) {
      try {
        await AuthService.sendForgotPassword(email);
        localStorage.setItem("forgotPassword", moment().format());
        toast.success(t("modal.login.forgot.success"));
        initTimer();
      } catch (error: any) {
        form.setError("email", {
          type: "manual",
          message: error.response?.data?.error || t("modal.login.forgot.error"),
        });
      }
    } else initTimer();
    setTimeout(() => setIsLoading(false), 1000);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await sendForgotPassword(values.email);
    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const initTimer = () => {
    if (localStorage.getItem("forgotPassword")) {
      const lastEmailSent = moment(localStorage.getItem("forgotPassword"));
      const diff = moment().diff(lastEmailSent, "seconds");
      if (60 - diff > 0) setTimer(60 - diff);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("modal.login.forgot.email.label")}</FormLabel>
              <FormControl>
                <Input
                  icon={<MailIcon width="13" />}
                  placeholder={t("modal.login.forgot.email.label")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4">{t("modal.login.forgot.info")}</div>
        <div className="pt-4">
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="w-full group"
            disabled={isLoading || timer > 0 || emailErrors}
          >
            <div className="flex items-center">
              <div className="group-hover:-translate-x-2 transition-transform duration-300">
                {t("modal.login.forgot.button")}
                {timer > 0 && ` dans ${timer}`}
              </div>
              {!isLoading && (
                <div className="mt-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:block">
                  <ArrowIcon />
                </div>
              )}
              {isLoading && (
                <div className="pl-2">
                  <Loader />
                </div>
              )}
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotForm;
