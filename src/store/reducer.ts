import { ColorsType, ListsType, TasksType, TaskType } from "../types/types";
import { findColor, localStorageSetItem } from "../utils";
import { server } from "../api/api";

enum ActionType {
  SET_STATE = "SET_STATE",
  ADD_LIST = "ADD_LIST",
  ADD_TASK = "ADD_TASK",
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

    case ActionType.ADD_LIST: {
      const { title: name, listId: id, colorId } = action;
      const list = {
        id,
        name,
        colorId,
        tasks: [],
        color: findColor(state.colors, colorId),
      };
      const newLists = [...state.lists, list];
      server.addLists(newLists);
      return { ...state, lists: newLists };
    }

    case ActionType.ADD_TASK: {
      const { listId, text, then, callback } = action;
      const id = state.tasks.length + 1;

      const newTask: TaskType = {
        id,
        listId,
        text,
        completed: false,
      };

      const newLists: ListsType = state.lists.map((list) => {
        const newList = { ...list };
        if (list.id === listId) newList.tasks = [...list.tasks, newTask];
        return newList;
      });
      const newTasks: TasksType = [...state.tasks, newTask];

      server.addTasks(newTasks, then, callback);

      return { ...state, lists: newLists, tasks: newTasks };
    }

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
  addTask: (
    listId: number,
    text: string,
    then: () => void,
    callback: () => void
  ) =>
    ({
      type: ActionType.ADD_TASK,
      listId,
      text,
      then,
      callback,
    } as const),
};
