import { createContext, ReactNode, useEffect } from "react";
import { Field } from "@schemas/Field.schema";
import { useQuery, useQueryClient } from "react-query";
import { ref, onChildChanged, off } from "firebase/database";
import { database } from "@/firebase";
import * as FieldService from "@/services/field.service";

interface FieldContextProps {
  fields: Field[];
  isLoading: boolean;
}

export const FieldContext = createContext<FieldContextProps | undefined>(
  undefined,
);

export const FieldProvider: React.FC<{
  children: ReactNode;
  pageProps: { fields: Field[] };
}> = ({ children, pageProps }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData("field", pageProps.fields);
  }, [pageProps.fields, queryClient]);

  const { data: fields, isLoading } = useQuery("field", FieldService.get, {
    initialData: pageProps.fields,
    staleTime: 1,
    cacheTime: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const fieldRef = ref(database, `field`);
    onChildChanged(fieldRef, () => {
      queryClient.invalidateQueries("field");
    });
    return () => off(fieldRef);
  }, [queryClient]);

  return (
    <FieldContext.Provider value={{ fields, isLoading }}>
      {children}
    </FieldContext.Provider>
  );
};
