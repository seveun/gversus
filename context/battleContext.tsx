import { createContext, ReactNode, useEffect } from "react";
import { useState, useRef } from "react";
import { ref, onChildChanged, off } from "firebase/database";
import { database } from "@/firebase";
import { useQuery, useQueryClient } from "react-query";
import * as BattleService from "@/services/battle.service";
import * as GameService from "@/services/game.service";
import { Game as GameType } from "@schemas/Game.schema";
import { Box as BoxType } from "@schemas/Box.schema";
import { useUser } from "@/hooks/useUser";
import User from "@/types/User";
import { toast } from "sonner";
import moment from "moment";

interface BattleContextProps {
  user?: User;
  position: number | undefined;
  opened: boolean;
  setOpened: (opened: boolean) => void;
  game: GameType;
  openedWonItemModal: boolean;
  setOpenedWonItemModal: (opened: boolean) => void;
  handleJoinBattle: (position: number, isDelete?: boolean) => void;
  isCreator: boolean;
  alreadyJoined: boolean;
  volume: string;
  onVolume: () => void;
  box: BoxType | null;
  boxes: BoxType[];
  orders: { id: string; quantity: number }[];
  gameIdRef: React.MutableRefObject<string>;
  isUserActionReady: boolean;
  isLoading: boolean;
  cancelBattle?: () => void;
  timer: number;
  init: boolean;
}

export const BattleContext = createContext<BattleContextProps | undefined>(
  undefined,
);

export const BattleProvider: React.FC<{
  children: ReactNode;
  gameId: string;
}> = ({ children, gameId }) => {
  const queryClient = useQueryClient();
  const { user, wallet, openLoginModal } = useUser();
  const [openedWonItemModal, setOpenedWonItemModal] = useState(false);
  const [volume, setVolume] = useState("1");
  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState(undefined as number | undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [init, setInit] = useState(false);

  const gameIdRef = useRef(gameId);
  gameIdRef.current = gameId;

  const { data: game } = useQuery(
    "game",
    async () => {
      setIsLoading(true);
      try {
        if (gameIdRef.current) {
          const game = await GameService.getById(gameIdRef.current);
          setTimeout(() => setIsLoading(false), 500);
          if (!init) setInit(true);
          return game;
        }
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => setIsLoading(false), 500);
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!gameIdRef.current,
      refetchInterval: (data) => {
        if (!data?.id) return 5000;
        return false;
      },
    },
  ) as { data: GameType; isLoading: boolean };

  const statusRef = useRef<string | null>(null);
  statusRef.current = game?.status;

  const createdAtRef = useRef<Date | null>(null);
  createdAtRef.current = game?.createdAt;

  const orders = game?.data?.orders.map((order) => ({
    ...order,
    ...game?.data?.boxes.find((box) => box.id === order.id),
  }));

  const boxes = game?.data?.boxes
    .sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    })
    ?.flatMap((box) => {
      const quantity = orders.find(({ id }) => id === box.id)?.quantity || 0;
      return Array.from({ length: quantity }).map(() => box);
    }) as BoxType[];

  const box =
    game?.stepNumber !== null && game ? boxes?.[game?.stepNumber] : null;

  const isUserActionReady =
    !!box &&
    !!user &&
    user?.id === game?.creatorId &&
    !isLoading &&
    !!wallet &&
    game?.id === gameIdRef.current;

  const onVolume = () => {
    setVolume(volume === "0" ? "1" : "0");
    localStorage.setItem("volume", volume === "0" ? "1" : "0");
  };

  const handleJoinBattle = async (p: number, isDelete = false) => {
    if (isCreator) {
      setIsLoading(true);
      try {
        const token = await user.firebase.getIdToken();
        await BattleService.addBot(token, gameIdRef.current, {
          position: p,
        });
        toast.success(`Le bot a bien été ${isDelete ? "retiré" : "ajouté"}`);
      } catch (error: any) {
        toast.error(error?.response?.data?.error || "Une erreur est survenue");
      }
      return;
    } else if (alreadyJoined) {
      setIsLoading(true);
      try {
        const token = await user?.firebase.getIdToken();
        if (!token) return;
        BattleService.leave(token, gameIdRef.current);
      } catch (error: any) {
        toast.error(error?.response?.data?.error || "Une erreur est survenue");
      }
      return;
    }
    setPosition(p);
    if (user) setOpened(true);
    else openLoginModal("login");
  };

  const cancelBattle = async () => {
    setIsLoading(true);
    try {
      const token = await user?.firebase.getIdToken();
      if (!token) return;
      await BattleService.cancel(token, gameIdRef.current);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Une erreur est survenue");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (statusRef.current === "pending") {
      interval = setInterval(() => {
        const seconds =
          900 - moment().diff(moment(createdAtRef.current), "seconds");
        setTimer(seconds < 0 ? 0 : seconds);
        if (seconds <= 0) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameIdRef.current, statusRef.current, createdAtRef.current]);

  useEffect(() => {
    if (gameIdRef.current) {
      const fieldRef = ref(database, `/game/${gameIdRef.current}`);
      onChildChanged(fieldRef, () => {
        queryClient.invalidateQueries("game");
      });
      return () => off(fieldRef);
    }
  }, [queryClient, gameIdRef.current]);

  const alreadyJoined = !!game?.users?.find((u) => u.id === user?.id);
  const isCreator = user?.id === game?.creatorId;

  return (
    <BattleContext.Provider
      value={{
        user: user || undefined,
        position,
        timer,
        opened,
        setOpened,
        game,
        openedWonItemModal,
        setOpenedWonItemModal,
        handleJoinBattle,
        isCreator,
        alreadyJoined,
        volume,
        onVolume,
        box,
        boxes,
        orders,
        gameIdRef,
        isUserActionReady,
        isLoading,
        cancelBattle,
        init,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};
