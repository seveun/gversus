import MailIcon from "@/components/ui/icons/mailIcon";
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

const formSchema = z.object({
  email: z
    .string({ message: "Email obligatoire" })
    .email({ message: "Email invalide" }),
  password: z
    .string({ message: "Mot de passe obligatoire" })
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

const LoginForm = ({ forgotPassword }: { forgotPassword: () => void }) => {
  const { handleLogin } = useAuth();
  const { isLoading, setIsLoading } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await handleLogin(values.email, values.password);
    } catch (error: any) {
      const invalid =
        error?.toString()?.includes("(auth/invalid-credential)") || false;
      if (invalid) {
        form.setError("email", {
          type: "manual",
          message: "Email ou mot de passe invalide",
        });
      } else if (error?.message?.includes("(auth/too-many-requests)")) {
        form.setError("email", {
          type: "manual",
          message: "Trop de tentatives, veuillez réessayer plus tard",
        });
      }
      setTimeout(() => setIsLoading(false), 1000);
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  icon={<MailIcon width="13" />}
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input
                  icon={<LockIcon width="13" />}
                  type="password"
                  placeholder="Mot de passe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className="text-sm hover:underline hover:cursor-pointer"
          onClick={forgotPassword}
        >
          Mot de passe oublié ?
        </div>
        <div className="pt-4">
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="w-full group"
            disabled={isLoading}
          >
            <div className="flex items-center">
              <div className="group-hover:-translate-x-2 transition-transform duration-300">
                Connexion
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

export default LoginForm;
