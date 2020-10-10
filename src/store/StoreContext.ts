import React, { useContext } from "react";
import { InitialState } from "./StoreReducer";

export type StoreContextType = InitialState & {
  getDB: () => Promise<void>;
  postDefaultDB: () => Promise<void>;

  addList: (title: string, colorId: number, callback: () => void) => void;
  removeList: (id: number | string) => void;
  changeListTitle: (listId: number, title: string) => void;

  addTask: (
    listId: number,
    text: string,
    then: () => void,
    callback: () => void
  ) => void;
  removeTask: (listId: number, taskId: number) => void;
  changeTaskTitle: (
    listId: number,
    taskId: number,
    value: string | number
  ) => void;
  checkTask: (listId: number, taskId: number, completed: boolean) => void;

  setActiveList: (url: string) => void;
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
