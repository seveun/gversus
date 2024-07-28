import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useEmailVerif } from "@/hooks/useEmailVerif";

const SubmitButtonVerifModal = ({
  email,
  provider,
}: {
  email?: string | null;
  provider?: string | null;
}) => {
  const { form, tempMail, timer, isLoading, handleSendEmail } = useEmailVerif();
  const formError = form?.formState?.errors?.email ? true : false;

  return (
    <div className="flex flex-col items-center">
      <Button
        className="mt-6 w-[60%]"
        onClick={handleSendEmail}
        disabled={!tempMail || isLoading || timer > 0 || formError}
      >
        <div className="flex items-center">
          {!email && `Vérifier mon mail`}
          {email && tempMail !== email && `Changer mon mail`}
          {email && tempMail === email && `Renvoyer l'email`}
          {timer > 0 && ` dans ${timer}`}
          {isLoading && (
            <div className="ml-2">
              <Loader width="16" />
            </div>
          )}
        </div>
      </Button>
      {email && tempMail !== email && provider === "email" && (
        <div className="text-red-500">
          Attention ! vous devrez vous reconnecter
        </div>
      )}
    </div>
  );
};

export default SubmitButtonVerifModal;
