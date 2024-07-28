import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { numberFormatter } from "@/lib/utils";
import * as BoxOpening from "@/services/boxOpening.service";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";
import User from "@/types/User";
import { Box as BoxType } from "@schemas/Box.schema";
import { useTranslation } from "next-i18next";

const ConfirmBoxModalButtons = ({
  boxes,
  selectedBoxes,
  isLoading,
  setIsLoading,
  user,
  setSelectedBoxes,
  setOpened,
  fastOpening,
  setFastOpening,
  wallet,
}: {
  boxes: BoxType[];
  selectedBoxes: { id: string; quantity: number }[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  user: User;
  setSelectedBoxes?: (value: { id: string; quantity: number }[]) => void;
  setOpened: (value: boolean) => void;
  fastOpening: boolean;
  setFastOpening?: (value: boolean) => void;
  wallet: string;
}) => {
  const router = useRouter();
  const { t } = useTranslation(["modals", "common"]);

  const totalPrice =
    boxes &&
    selectedBoxes.reduce((acc, box) => {
      return (
        acc +
        (boxes?.find((b) => b?.id === box?.id)?.price || 0) * box?.quantity
      );
    }, 0);

  const buy = async () => {
    setIsLoading(true);
    try {
      const token = await user.firebase.getIdToken();
      const gameId = await BoxOpening.open(token, {
        orders: selectedBoxes,
        wallet: wallet as any,
        fastOpening,
      });
      toast.success(t("modal.config.box.success"));
      router.push(`/game/box?id=${gameId}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || t("modal.config.box.error"));
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-end items-center gap-2 mt-2">
      <div className="text-base font-medium flex items-center max-sm:hidden">
        <Checkbox
          disabled={!setSelectedBoxes}
          checked={fastOpening}
          onCheckedChange={setFastOpening}
        />
        <div className="ml-1 opacity-70">
          {t("box.buyer.fastopening", { ns: "common" })}
        </div>
      </div>
      <Button
        disabled={isLoading}
        onClick={() => setOpened(false)}
        size="lg"
        variant="dark"
        className="h-9"
      >
        <div className="text-sm">{t("dialog.button.cancel")}</div>
      </Button>
      <Button
        onClick={buy}
        size="lg"
        className="h-9 max-md:w-full"
        disabled={isLoading || totalPrice === 0}
      >
        <div className="flex items-center gap-2">
          <div className="text-sm">
            {t("modal.confirm.button")}
            {selectedBoxes.length > 0 &&
              t("modal.confirm.buttton.amount", {
                amount: numberFormatter.format(totalPrice),
              })}
          </div>
          {isLoading && <Loader width="15" />}
        </div>
      </Button>
    </div>
  );
};

export default ConfirmBoxModalButtons;
