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
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import Loader from "@/components/ui/loader";

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

const RegisterFormConfirm = ({
  email,
  onBack,
  username,
}: {
  username: string;
  email: string;
  onBack: (alreadyRegister?: boolean) => void;
}) => {
  const { handleRegister } = useAuth();
  const { isLoading, setIsLoading } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await handleRegister(email, username, values.password);
    } catch (error: unknown) {
      const alreadyRegister =
        error?.toString()?.includes("(auth/email-already-in-use)") || false;
      onBack(alreadyRegister);
      setTimeout(() => setIsLoading(false), 1000);
    }
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
            type="button"
            variant="ghost"
            size="lg"
            className="group"
            onClick={() => onBack()}
          >
            <div className="flex items-center rotate-180">
              <ArrowIcon color="white" />
            </div>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full group ml-2"
            type="submit"
            disabled={isLoading}
          >
            <div className="flex items-center">
              <div className="group-hover:-translate-x-2 transition-transform duration-300">
                S'inscrire
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

export default RegisterFormConfirm;
