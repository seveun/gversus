import { createContext, ReactNode, useEffect } from "react";
import { Box } from "@schemas/Box.schema";
import * as BattleService from "@/services/battle.service";
import { toast } from "sonner";
import { useWallet } from "@/hooks/useWallet";
import { useBox } from "@/hooks/useBox";
import { useState } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import User from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Game } from "@schemas/Game.schema";
import { useRouter } from "next/router";

interface BattleModalContextProps {
  isLoading: boolean;
  handleJoinBattle: (values: z.infer<typeof formSchema>) => void;
  isDisabled: boolean;
  totalPrice: number;
  filteredBoxes: Box[];
  selectedBoxes: { id: string; quantity: number }[];
  setSelectedBoxes: (value: { id: string; quantity: number }[]) => void;
  filterOrder: string;
  setFilterOrder: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  gameId: string;
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const BattleModalContext = createContext<
  BattleModalContextProps | undefined
>(undefined);

const formSchema = z
  .object({
    status: z.enum(["public", "private"]),
    battleMode: z.enum(["1v1", "1v1v1", "1v1v1v1", "2v2"]),
    bot: z.string().optional().default("0"),
    battleType: z.enum(["classic", "crazy"]),
    password: z.string().min(6).max(30).optional(),
  })
  .refine(
    (data) =>
      data.status === "public" || (data.status === "private" && data.password),
    {
      message: "Password is required",
      path: ["password"],
    },
  );

export const BattleModalProvider: React.FC<{
  children: ReactNode;
  user: User;
  setOpened: (value: boolean) => void;
  opened: boolean;
  game?: Game;
  position?: number;
}> = ({ children, user, opened, setOpened, game, position }) => {
  const router = useRouter();
  const { wallet } = useWallet(user);
  const [filterOrder, setFilterOrder] = useState("newest");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState(
    game?.data?.orders || ([] as { id: string; quantity: number }[]),
  );
  const [gameId, setGameId] = useState(game?.id || "");
  const { boxes } = useBox();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "public",
      battleMode: "1v1",
      bot: "0",
      battleType: "classic",
    },
  });

  useEffect(() => {
    form.setValue("status", game?.isPrivate ? "private" : "public");
    form.setValue("battleMode", game?.battleMode || "1v1");
    form.setValue("battleType", game?.data?.battleType || "classic");
  }, [game]);

  useEffect(() => {
    if (opened && !game) setGameId(uuidv4());
  }, [opened]);

  const handleJoinBattle = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const body = {
        ...values,
        bot: parseInt(values.bot, 10),
        isPrivate: values.status === "private",
        id: gameId,
        orders: selectedBoxes,
        wallet,
      };
      try {
        const token = await user.firebase.getIdToken();
        if (!game) {
          await BattleService.create(token, body);
          toast.success("La battle a bien été créée");
        } else {
          await BattleService.join(token, gameId, {
            wallet,
            ...(position && { position }),
            ...(values.password && { password: values.password }),
          });
          toast.success("Vous avez bien rejoint la battle");
        }
        if (position) setOpened(false);
        else router.push(`/game/battle?id=${gameId}`);
      } catch (error: any) {
        const wrongPassword =
          error?.response?.data?.error === "Invalid password";
        setIsLoading(false);
        toast.error(error?.response?.data?.error || "Une erreur est survenue");
        if (!game) setGameId(uuidv4());
        if (wrongPassword)
          form.setError("password", { message: "Wrong password" });
        else setOpened(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    } finally {
      if (position) setIsLoading(false);
    }
  };

  const filteredBoxes = boxes
    .filter((b) => b?.name?.toLowerCase()?.includes(search.toLowerCase()))
    .sort((a, b) => {
      if (filterOrder === "price-low") return a.price - b.price;
      if (filterOrder === "price-high") return b.price - a.price;
      if (filterOrder === "newest")
        return moment(a.createdAt).unix() - moment(b.createdAt).unix();
      if (filterOrder === "oldest")
        return moment(b.createdAt).unix() - moment(a.createdAt).unix();
      return 0;
    });

  const totalPrice =
    boxes &&
    selectedBoxes.reduce((acc, box) => {
      return (
        acc +
        (boxes?.find((b) => b?.id === box?.id)?.price || 0) * box?.quantity
      );
    }, 0);

  const isDisabled = !selectedBoxes.length;

  return (
    <BattleModalContext.Provider
      value={{
        gameId,
        isLoading,
        handleJoinBattle,
        isDisabled,
        totalPrice,
        filteredBoxes,
        selectedBoxes,
        setSelectedBoxes,
        filterOrder,
        setFilterOrder,
        search,
        setSearch,
        form,
      }}
    >
      {children}
    </BattleModalContext.Provider>
  );
};
