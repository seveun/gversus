import { createContext, ReactNode, useEffect } from "react";
import { Box } from "@schemas/Box.schema";
import { useQuery, useQueryClient } from "react-query";
import { ref, onChildChanged, off } from "firebase/database";
import { database } from "@/firebase";
import * as BoxService from "@/services/box.service";

interface BoxContextProps {
  boxes: Box[];
  isLoading: boolean;
}

export const BoxContext = createContext<BoxContextProps | undefined>(undefined);

export const BoxProvider: React.FC<{
  children: ReactNode;
  pageProps: { boxes: Box[] };
}> = ({ children, pageProps }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData("boxes", pageProps.boxes);
  }, [pageProps.boxes, queryClient]);

  const { data: boxes, isLoading } = useQuery("boxes", BoxService.get, {
    initialData: pageProps.boxes,
    staleTime: 1,
    cacheTime: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const boxRef = ref(database, `box`);
    onChildChanged(boxRef, () => {
      queryClient.invalidateQueries("boxes");
    });
    return () => off(boxRef);
  }, [queryClient]);

  return (
    <BoxContext.Provider value={{ boxes, isLoading }}>
      {children}
    </BoxContext.Provider>
  );
};
