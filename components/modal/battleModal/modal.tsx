import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import Header from "./header";
import Params from "./params";
import Share from "./share";
import { Button } from "@/components/ui/button";
import { numberFormatter } from "@/lib/utils";
import Loader from "@/components/ui/loader";
import BoxGrid from "@/components/boxGrid";
import { useBattleModal } from "@/hooks/useBattleModal";
import { Game } from "@schemas/Game.schema";
import { useTranslation } from "next-i18next";

const BattleModalContent = ({
  opened,
  setOpened,
  game,
}: {
  opened: boolean;
  setOpened: (value: boolean) => void;
  game?: Game;
}) => {
  const {
    isLoading,
    isDisabled,
    totalPrice,
    filteredBoxes,
    selectedBoxes,
    setSelectedBoxes,
    gameId,
    handleJoinBattle,
    form,
  } = useBattleModal();
  const { t } = useTranslation("modals");
  return (
    <Dialog open={opened} onOpenChange={(o) => !isLoading && setOpened(o)}>
      <DialogContent
        className={cn(
          "max-semilg:min-w-[95%] min-w-[80%] bg-secondary overflow-hidden",
          "2xl:min-w-[1400px] overflow-y-scroll max-h-screen",
        )}
      >
        <DialogDescription
          className={cn(
            "relative",
            isLoading && "opacity-50 cursor-not-allowed",
          )}
        >
          <div className="flex justify-between">
            <div className="w-[43%] text-white max-md:w-full">
              <div className="md:pb-1.5 text-[1rem]">
                {game &&
                  t("modal.battle.join.title") +
                    game?.users?.find((p) => p.GamesUsers.position === 1)
                      ?.username}
                {!game && t("modal.battle.create.title")}
              </div>
              <div className="h-96 flex flex-col justify-center max-md:h-full max-h">
                <Params disabled={!!game} />
                <div className={cn("md:hidden", game && "cursor-not-allowed")}>
                  <Header />
                  <div className="border bg-background rounded-md overflow-auto h-96 max-md:h-[22rem]">
                    <BoxGrid
                      disabled={!!game}
                      boxes={game ? game.data.boxes : filteredBoxes}
                      selectedBoxes={selectedBoxes}
                      setSelectedBoxes={setSelectedBoxes}
                      variant="confirm"
                    />
                  </div>
                </div>
                <Share gameId={gameId} />
                <Button
                  onClick={form.handleSubmit(handleJoinBattle)}
                  size="lg"
                  className="h-9 w-full mt-4 min-h-9"
                  disabled={isDisabled}
                >
                  <div className="flex items-center gap-2">
                    {game
                      ? t("modal.battle.join.button")
                      : t("modal.battle.create.button")}
                    {numberFormatter.format(totalPrice)} €
                    {isLoading && <Loader width="18" />}
                  </div>
                </Button>
              </div>
            </div>
            <div
              className={cn(
                "w-[54%] max-md:hidden",
                game && "cursor-not-allowed",
              )}
            >
              <Header />
              <div className="border bg-background rounded-md overflow-auto h-96">
                <BoxGrid
                  disabled={!!game}
                  size="small"
                  boxes={game ? game.data.boxes : filteredBoxes}
                  selectedBoxes={selectedBoxes}
                  setSelectedBoxes={setSelectedBoxes}
                  variant="confirm"
                />
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default BattleModalContent;
