import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmailVerifProvider } from "@/context/emailVerifContext";
import MailIcon from "@/components/ui/icons/mailIcon";
import Form from "./form";
import { useUser } from "@/hooks/useUser";
import { useTranslation } from "next-i18next";

const EmailVeriModal = () => {
  const { verifMailOpened, user } = useUser();
  const email = user?.tempEmail || user?.email;
  const { t } = useTranslation("modals");
  return (
    <div>
      <Dialog open={verifMailOpened}>
        <DialogContent className="overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              <div className="w-full flex justify-center pb-8 pt-4">
                <MailIcon width="50" />
              </div>
              <div className="text-lg w-full text-center pb-3">
                {t("modal.email.verif.title")}
              </div>
            </DialogTitle>
            <DialogDescription className="text-center">
              <EmailVerifProvider>
                <Form email={email} user={user} />
              </EmailVerifProvider>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailVeriModal;
