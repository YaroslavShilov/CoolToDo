import React, { useContext } from "react";
import { InitialState } from "./reducer";

export type StoreContextType = {
  state: InitialState;
  postDefaultDB: () => Promise<void>;
};

export const StoreContext = React.createContext<StoreContextType | undefined>(
  undefined
);

export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error("context is not provided");
  }

  return context;
};
