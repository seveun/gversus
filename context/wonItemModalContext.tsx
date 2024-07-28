import { useState, useEffect, createContext, ReactNode } from "react";
import { ref, onChildChanged, off } from "firebase/database";
import { database } from "@/firebase";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "react-query";
import * as GameService from "@/services/game.service";
import * as ItemService from "@/services/item.service";
import { Transaction as TransactionType } from "@schemas/Transaction.schema";
import { useUser } from "@/hooks/useUser";

interface WonItemModalContextProps {
  selectedItems: string[];
  selectedAll: boolean;
  handleSelectItem: (item: TransactionType) => void;
  handleSelectAll: () => void;
  handleSell: () => void;
  isSoldLoading: boolean;
  items: TransactionType[];
  isLoading: boolean;
}

export const WonItemModalContext = createContext<
  WonItemModalContextProps | undefined
>(undefined);

export const WonItemModalProvider = ({
  children,
  gameId,
  opened,
}: {
  children: ReactNode;
  gameId: string;
  opened: boolean;
}) => {
  const [selectedItems, setSelectedItems] = useState([] as string[]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [isSoldLoading, setIsSoldLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { data: items } = useQuery(
    "items",
    async () => {
      if (user?.id) {
        setIsLoading(true);
        try {
          const token = await user.firebase.getIdToken();
          const items = await GameService.getWonItems(token, gameId);
          setIsLoading(false);
          return items;
        } catch (error) {
          setIsLoading(false);
          return [];
        }
      }
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!opened,
      staleTime: 0,
      cacheTime: 0,
    },
  ) as { data: TransactionType[] };

  useEffect(() => {
    if (!open) {
      setSelectedItems([]);
      setSelectedAll(false);
    }
  }, [open]);

  useEffect(() => {
    if (opened && user) {
      const winRef = ref(database, `${user?.id}/items/win`);
      onChildChanged(winRef, () => {
        queryClient.invalidateQueries("items");
      });
      return () => off(winRef);
    }
  }, [opened, user]);

  const handleSelectItem = (item: TransactionType) => {
    if (selectedItems.includes(item.id)) {
      setSelectedItems(selectedItems.filter((i) => i !== item.id));
    } else if (item.type === "item")
      setSelectedItems([...selectedItems, item.id]);
  };

  const handleSelectAll = () => {
    if (selectedAll) setSelectedItems([]);
    else
      setSelectedItems(
        items?.filter((i) => i.type === "item")?.map((i) => i.id),
      );
    setSelectedAll(!selectedAll);
  };

  const handleSell = async () => {
    setIsSoldLoading(true);
    if (selectedItems.length > 0 && user) {
      try {
        const token = await user.firebase.getIdToken();
        await ItemService.sell(token, selectedItems);
        toast.success("Vente effectuée avec succès");
      } catch (error) {
        toast.error("Une erreur s'est produite");
      }
      setSelectedItems([]);
    }
    setTimeout(() => setIsSoldLoading(false), 1000);
  };

  return (
    <WonItemModalContext.Provider
      value={{
        selectedItems,
        selectedAll,
        handleSelectItem,
        handleSelectAll,
        handleSell,
        isSoldLoading,
        items,
        isLoading,
      }}
    >
      {children}
    </WonItemModalContext.Provider>
  );
};
