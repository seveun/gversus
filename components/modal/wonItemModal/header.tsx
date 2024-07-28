import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CupCircleIcon from "@/components/ui/icons/cupCircleIcon";
import { useWonItem } from "@/hooks/useWonItem";
import { Button } from "@/components/ui/button";

const WinItemModalHeader = ({ win }: { win: boolean }) => {
  const { items, selectedAll, handleSelectAll } = useWonItem();
  return (
    <>
      <div className="absolute top-0">
        <CupCircleIcon />
      </div>
      <DialogHeader>
        <DialogTitle className="mt-10 relative">
          <div className="text-[1.3rem] ml-28 pb-8">
            {win && (
              <div>Félicitations ! Vous avez gagné {items?.length} item(s)</div>
            )}
            {!win && (
              <div>
                Vous avez perdu..
                <div className="pt-2 text-[0.7rem] opacity-60 font-extralight">
                  Peut-être que vous aurez plus de chance la prochaine fois..
                </div>
              </div>
            )}
          </div>
        </DialogTitle>
      </DialogHeader>
      {win && (
        <div className="w-full flex justify-end relative">
          <Button
            variant="dark"
            onClick={handleSelectAll}
            className="w-full lg:w-[20%]"
          >
            Tout {selectedAll ? "désélectionner" : "sélectionner"}
          </Button>
        </div>
      )}
    </>
  );
};

export default WinItemModalHeader;
