import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MailIcon from "@/components/ui/icons/mailIcon";
import PhoneIcon from "@/components/ui/icons/phoneIcon";
import SmsIcon from "@/components/ui/icons/smsIcon";
import { useUser } from "@/hooks/useUser";
import { TwoAuthProvider } from "@/context/twoAuthContext";
import Description from "./description";
import Form from "./form";

const TwoAuthModal = () => {
  const { verifTwoFactorOpened, user } = useUser();
  return (
    <div>
      <Dialog open={verifTwoFactorOpened}>
        <DialogContent className="overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              <div className="w-full flex justify-center pb-4 pt-4">
                {user?.twoFactor === "email" && <MailIcon width="50" />}
                {user?.twoFactor === "app" && <PhoneIcon width="50" />}
                {user?.twoFactor === "sms" && <SmsIcon width="50" />}
              </div>
              <div className="text-[1.5rem] w-full text-center pb-3">
                Two-factor authentication
              </div>
            </DialogTitle>
            <DialogDescription className="text-center">
              <TwoAuthProvider>
                <Form />
                <Description user={user} />
              </TwoAuthProvider>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TwoAuthModal;
