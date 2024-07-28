import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTwoAuth } from "@/hooks/useTwoAuth";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useUser } from "@/hooks/useUser";

const twoAuthForm = () => {
  const { user } = useUser();
  const { form, onSubmit, isLoading, isSendLoading, timer, handleSendCode } =
    useTwoAuth();
  const formError = form?.formState?.errors?.code ? true : false;

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-[40%]">
                <FormControl>
                  <Input placeholder="XXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {user?.twoFactor !== "app" && (
            <Button
              className="ml-2"
              variant="secondary"
              type="button"
              onClick={handleSendCode}
              disabled={isSendLoading || isLoading || timer > 0}
            >
              <div className="flex items-center justify-center min-w-[100px]">
                <div>Envoyer {timer > 0 && `dans ${timer}`}</div>
                {isSendLoading && (
                  <div className="ml-2">
                    <Loader width="16" />
                  </div>
                )}
              </div>
            </Button>
          )}
        </div>
        <div>
          <Button
            size="lg"
            className="w-[70%] mt-3"
            disabled={
              isLoading || timer > 0 || formError || !form.formState.isDirty
            }
            type="submit"
          >
            <div className="flex items-center">
              <div>Vérifier</div>
              {isLoading && (
                <div className="ml-2">
                  <Loader width="16" />
                </div>
              )}
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default twoAuthForm;
