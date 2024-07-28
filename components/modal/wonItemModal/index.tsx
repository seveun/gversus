import { Dialog } from "@/components/ui/dialog";
import { WonItemModalProvider } from "@/context/wonItemModalContext";
import Modal from "./modal";

const WonItenModal = ({
  gameId,
  setOpened,
  opened,
  losable = false,
}: {
  gameId: string;
  setOpened: (opened: boolean) => void;
  opened: boolean;
  losable?: boolean;
}) => {
  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <WonItemModalProvider gameId={gameId} opened={opened}>
        <Modal setOpened={setOpened} losable={losable} />
      </WonItemModalProvider>
    </Dialog>
  );
};

export default WonItenModal;
