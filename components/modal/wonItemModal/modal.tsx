import Description from "./description";
import Buttons from "./Buttons";
import { DialogContent } from "@/components/ui/dialog";
import Header from "./header";
import { useWonItem } from "@/hooks/useWonItem";
import { cn } from "@/lib/utils";

export const WonItenModal = ({
  setOpened,
  losable = false,
}: {
  setOpened: (opened: boolean) => void;
  losable: boolean;
}) => {
  const { items, isLoading } = useWonItem();
  const win = isLoading || !losable || items?.length > 0;
  return (
    !(isLoading && !items) && (
      <DialogContent
        className={cn(
          "min-w-[62%] bg-secondary overflow-hidden",
          "max-md:min-w-[90%] h-[98%] max-h-[45rem]",
          !win && "min-w-[30%] h-[35%]",
        )}
      >
        <Header win={win} />
        {win && <Description />}
        <Buttons setOpened={setOpened} win={win} />
      </DialogContent>
    )
  );
};

export default WonItenModal;
