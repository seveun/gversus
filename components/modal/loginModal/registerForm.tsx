import MailIcon from "@/components/ui/icons/mailIcon";
import UserIcon from "@/components/ui/icons/userIcon";
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
import RegisterFormConfirm from "./registerFormConfirm";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import Loader from "@/components/ui/loader";

const formSchema = z.object({
  email: z
    .string({ message: "Email obligatoire" })
    .email({ message: "Email invalide" }),
  username: z
    .string({ message: "Username obligatoire" })
    .min(4, { message: "L'username doit contenir au moins 4 caractères" }),
});

const RegisterForm = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { isLoading } = useUser();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setUsername(values.username);
    setEmail(values.email);
    setShowPasswordForm(true);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return showPasswordForm ? (
    <RegisterFormConfirm
      username={username}
      email={email}
      onBack={(alreadyRegister) => {
        setShowPasswordForm(false);
        if (alreadyRegister) {
          form.setError("email", {
            type: "manual",
            message: "Cet email est déjà utilisé",
          });
        }
      }}
    />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pseudonyme</FormLabel>
              <FormControl>
                <Input
                  icon={<UserIcon width="14" />}
                  placeholder="Pseudonyme"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  icon={<MailIcon width="14" />}
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                Suivant
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

export default RegisterForm;
