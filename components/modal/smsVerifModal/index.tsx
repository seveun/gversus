import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SmsIcon from "@/components/ui/icons/smsIcon";
import { useUser } from "@/hooks/useUser";
import { TwoAuthProvider } from "@/context/twoAuthContext";
import Description from "./description";
import Form from "./form";
import { useSmsVerif } from "@/hooks/useSmsVerif";

const SmsVerifModal = () => {
  const { user } = useUser();
  const { isOpen, setIsOpen } = useSmsVerif();
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              <div className="w-full flex justify-center pb-4 pt-4">
                <SmsIcon width="50" />
              </div>
              <div className="text-[1.5rem] w-full text-center pb-3">
                Sms verification
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

export default SmsVerifModal;
