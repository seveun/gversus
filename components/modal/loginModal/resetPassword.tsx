import LockIcon from "@/components/ui/icons/lockIcon";
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
import { useState } from "react";
import * as AuthService from "@/services/auth.service";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

const formSchema = z
  .object({
    password: z.string({ message: "Mot de passe obligatoire" }).min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
    confirmPassword: z.string({
      message: "Confirmation du mot de passe obligatoire",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe doivent être identiques",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { resetPasswordCode } = useUser();
  const { handleLogin } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (!resetPasswordCode) {
        form.setError("password", {
          message: "Code de réinitialisation invalide",
        });
        setTimeout(() => setIsLoading(false), 1000);
        return null;
      }
      const { email } = await AuthService.resetPassword(
        values.password,
        resetPasswordCode,
      );
      if (email) {
        handleLogin(email, values.password);
        form.reset();
        router.push("/");
      }
    } catch (error: any) {
      form.setError("password", {
        message: error?.response?.data?.error || "Erreur inconnue",
      });
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  icon={<LockIcon width="14" />}
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input
                  icon={<LockIcon width="14" />}
                  type="password"
                  placeholder="Mot de passe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex pt-4">
          <Button
            variant="secondary"
            size="lg"
            className="w-full group ml-2"
            type="submit"
            disabled={isLoading}
          >
            <div className="flex items-center">
              <div className="group-hover:-translate-x-2 transition-transform duration-300">
                Réinitialiser le mot de passe
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

export default ResetPassword;
