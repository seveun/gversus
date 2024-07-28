import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import CopyPasteIcon from "@/components/ui/icons/copyPasteIcon";
import { Input } from "@/components/ui/input";
import { useTranslation } from "next-i18next";

const ShareBattleModal = ({ gameId }: { gameId: string }) => {
  const url = process.env.NEXT_PUBLIC_URL + "/game/battle/" + gameId;
  const { t } = useTranslation("modals");
  return (
    <>
      <Separator className="my-5" />
      <div className="flex items-center justify-between w-full bg-hover p-2 rounded-md">
        <div className="text-[0.7rem] text-nowrap pr-4">
          <div>{t("modal.share.title")}</div>
          <div className="opacity-70 -mt-1.5 font-extralight">
            {t("modal.share.description")}
          </div>
        </div>
        <div className="w-full">
          <Input
            className="h-8 text-white/60 bg-secondary w-full"
            readOnly
            iconAfter={
              <CopyToClipboard
                text={url}
                onCopy={() => toast.success("Copié !")}
              >
                <div className="cursor-pointer opacity-70 hover:opacity-100">
                  <CopyPasteIcon />
                </div>
              </CopyToClipboard>
            }
            value={url}
          />
        </div>
      </div>
    </>
  );
};

export default ShareBattleModal;
