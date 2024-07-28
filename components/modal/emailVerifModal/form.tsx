import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEmailVerif } from "@/hooks/useEmailVerif";
import Description from "./description";
import SubmitButton from "./submitButton";
import User from "@/types/User";
import { useTranslation } from "next-i18next";

const verifModalForm = ({
  email,
  user,
}: {
  email?: string | null;
  user: User | null;
}) => {
  const [isEdditable, setIsEdditable] = useState(false);
  const { form, onSubmit, setTempMail } = useEmailVerif();
  const { t } = useTranslation("modals");

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[55%]">
                <FormControl>
                  <Input
                    disabled={!email || isEdditable ? false : true}
                    placeholder={t("modal.email.verif.placeholder")}
                    {...field}
                    className="h-8"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {email && (
            <Button
              className="h-8 ml-2"
              type="button"
              variant="secondary"
              onClick={() => {
                if (isEdditable) {
                  setIsEdditable(false);
                  if (email) {
                    form.setValue("email", email);
                    setTempMail(email);
                  }
                } else setIsEdditable(true);
              }}
            >
              <div>
                {email && !isEdditable && t("dialog.button.change")}
                {email && isEdditable && t("dialog.button.cancel")}
              </div>
            </Button>
          )}
        </div>
        <Description email={email} />
        <SubmitButton email={email} provider={user?.provider} />
      </form>
    </Form>
  );
};

export default verifModalForm;
