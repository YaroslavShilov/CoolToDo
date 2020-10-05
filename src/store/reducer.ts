import { ColorsType, ListsType, TasksType } from "../types/types";
import { findColor, localStorageSetItem } from "../utils";

enum ActionType {
  SET_STATE = "SET_STATE",
  ADD_LIST = "ADD_LIST",
}

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
  switch (action.type) {
    case ActionType.SET_STATE:
      return action.payload;

    case ActionType.ADD_LIST:
      const { title: name, listId: id, colorId } = action;
      const list = {
        id,
        name,
        colorId,
        tasks: [],
        color: findColor(state.colors, colorId),
      };
      const lists = [...state.lists, list];
      localStorageSetItem("lists", lists);

      return { ...state, lists };

    default:
      return state;
  }
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionsType = ReturnType<InferValueTypes<typeof actions>>;

export const actions = {
  setState: (state: InitialState) =>
    ({
      type: ActionType.SET_STATE,
      payload: state,
    } as const),

  addList: (title: string, colorId: number, listId: number) =>
    ({
      type: ActionType.ADD_LIST,
      title,
      colorId,
      listId,
    } as const),
};
