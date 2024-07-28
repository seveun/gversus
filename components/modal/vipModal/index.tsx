import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StarsCircleIcon from "@/components/ui/icons/starsCircleIcon";
import { useUser } from "@/hooks/useUser";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as configService from "@/services/config.service";
import * as FreeBoxService from "@/services/freeBox.service";
import { useQuery } from "react-query";
import Image from "next/image";
import { cdn, cn } from "@/lib/utils";
import LockFillIcon from "@/components/ui/icons/lockFillIcon";
import UnlockFillIcon from "@/components/ui/icons/unlockFillIcon";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";

export const VipModal = () => {
  const { user, vipModalOpened, closeVipModal } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const lastOpened = localStorage.getItem("vip");

  const { data: levels } = useQuery(
    "levels",
    async () => {
      const token = await user?.firebase?.getIdToken();
      if (!token) return;
      const configs = await configService.getLevel(token);
      setIsLoading(false);
      return configs;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!user,
    },
  );

  const open = async (level: number) => {
    setIsLoading(true);
    try {
      if (!user) return;
      const token = await user.firebase.getIdToken();
      const gameId = await FreeBoxService.openLevel(token, level);
      toast.success("Box ouverte avec succès");
      localStorage.setItem("vip", level.toString());
      router.push(`/game/box?id=${gameId}`);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.error || error.message);
    }
  };

  return (
    <Dialog open={vipModalOpened} onOpenChange={closeVipModal}>
      <DialogContent className="min-w-[55%] max-lg:min-w-[70%] max-md:min-w-[90%]">
        <div className="absolute top-0 left-0">
          <StarsCircleIcon />
        </div>
        <DialogHeader>
          <DialogTitle className="mt-10 relative">
            <div className="text-[1.1rem] sm:ml-[7.5rem] pb-12 max-sm:-ml-[5rem]">
              VIP
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="relative">
          <div className="flex w-full items-end justify-between max-sm:flex-col">
            <div className="border rounded-lg bg-secondary py-3 px-4 w-[50%] max-sm:w-full">
              <div className="flex justify-between text-sm pb-2">
                <div className="text-white/90">Progression</div>
                <div>{user?.xp}%</div>
              </div>
              <Progress value={user?.xp} className="h-2" />
              <div className="flex justify-between text-sm pt-2">
                <div>Niveau {user?.level}</div>
                <div>Niveau {(user?.level || 0) + 1}</div>
              </div>
            </div>
            <div className="w-[46%] max-sm:w-full max-sm:mt-2">
              <div className="pb-1.5">Code promo</div>
              <div className="flex w-full">
                <Input
                  size={80}
                  disabled
                  className="bg-hover h-9 rounded-none rounded-l-md w-full"
                  placeholder="G-Y8ZAMB5SD4"
                />
                <Button
                  disabled
                  variant="secondary"
                  className="h-9 rounded-none rounded-r-md"
                >
                  Ajouté
                </Button>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "bg-backgroundDark border mt-4 grid grid-cols-4 max-h-[21.7rem] min-h-[21.7rem]",
              "overflow-y-auto overflow-x-hidden rounded-md gap-4 p-4 relative",
              isLoading && "opacity-50 cursor-not-allowed",
              "max-sm:grid-cols-2",
            )}
          >
            {isLoading && (
              <div className="absolute top-0 w-full h-full flex justify-center items-center">
                <Loader width="30" />
              </div>
            )}
            {levels?.configs
              .sort(
                (a, b) =>
                  parseInt(a.value || "0", 10) - parseInt(b.value || "0", 10),
              )
              .map((config) => {
                const item = levels.transactions.find(
                  (t) => t.level === config.value,
                );
                let unlock =
                  (user?.level || 0) >= parseInt(config.value || "0", 10);
                if (
                  lastOpened &&
                  parseInt(lastOpened, 10) ===
                    parseInt(config.value || "0", 10) &&
                  !item
                ) {
                  unlock = false;
                }
                return (
                  <div
                    onClick={
                      unlock && !item
                        ? () => open(parseInt(config.value || "0", 10))
                        : undefined
                    }
                    key={"level" + config.value}
                    className="bg-hover border rounded-md py-3 group"
                    style={{
                      opacity: unlock && !isLoading ? 1 : 0.4,
                      cursor:
                        unlock && !isLoading && !item
                          ? "pointer"
                          : "not-allowed",
                    }}
                  >
                    <div
                      className={cn(
                        "flex h-[5rem] justify-between px-4 relative",
                        unlock &&
                          !item &&
                          "ease-in-out group-hover:scale-[1.1] group-hover:translate-y-[2%]",
                      )}
                    >
                      <Image
                        src={cdn(
                          item ? item?.itemData?.image : config.box.image,
                        )}
                        alt="vip box"
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                        className={cn("scale-125", item && "py-2")}
                      />
                    </div>
                    <div
                      className={cn(
                        "flex flex-col items-center text-white mt-2",
                      )}
                    >
                      <div>{item && item.itemData?.name.slice(0, 17)}</div>
                      {!item &&
                        (unlock ? <UnlockFillIcon /> : <LockFillIcon />)}
                      Level {config.value}
                    </div>
                  </div>
                );
              })}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default VipModal;
