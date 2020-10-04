import {
  ColorsType,
  DefaultDB,
  DefListsType,
  InferValueTypes,
  ListsType,
  TasksType,
} from "../types/types";
import { findColor, localStorageGetItem, localStorageSetItem } from "../utils";
import { Dispatch } from "react";

export type InitialState = {
  lists: ListsType;
  tasks: TasksType;
  colors: ColorsType;
};

export const initialState: InitialState = {
  lists: [],
  tasks: [],
  colors: [],
};

export const reducer = (
  state: InitialState = initialState,
  action: ActionsType
): InitialState => {
  console.log("reducer", action.type);
  switch (action.type) {
    case "SET_STATE":
      console.log("reducer set_state", action.payload);
      return action.payload;

    default:
      return state;
  }
};

export type ActionsType = ReturnType<InferValueTypes<typeof actions>>;

export const actions = {
  setState: (state: InitialState) => {
    console.log("action set_state");
    return {
      type: "SET_STATE",
      payload: state,
    };
  },
};
