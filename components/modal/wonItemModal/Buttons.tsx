import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useWonItem } from "@/hooks/useWonItem";

const WonItemModalButtons = ({
  setOpened,
  win,
}: {
  setOpened: (opened: boolean) => void;
  win: boolean;
}) => {
  const { selectedItems, handleSell, isSoldLoading } = useWonItem();
  return win ? (
    <div className="flex items-center w-full justify-end gap-2">
      <Button
        size="lg"
        variant="secondary"
        className="mr-0.5 mt-2 h-9"
        onClick={handleSell}
        disabled={selectedItems.length === 0 || isSoldLoading}
      >
        <div className="flex items-center gap-2">
          Vendre
          {isSoldLoading && <Loader width="14" />}
        </div>
      </Button>
      <Button
        size="lg"
        variant="ghost"
        className="mr-0.5 mt-2 h-9"
        onClick={() => setOpened(false)}
      >
        Fermer
      </Button>
    </div>
  ) : (
    <div className="w-full flex justify-center relative">
      <Button
        size="lg"
        variant="secondary"
        className="w-[60%] text-[0.9rem] font-semibold max-md:w-[90%]"
        onClick={() => setOpened(false)}
      >
        Fermer
      </Button>
    </div>
  );
};

export default WonItemModalButtons;
