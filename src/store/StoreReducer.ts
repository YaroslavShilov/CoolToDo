import {
  ColorsType,
  ListsType,
  ListType,
  TasksType,
  TaskType,
} from "../types/types";
import { changeTask, findColor } from "../utils";
import { server } from "../api/api";

enum ActionType {
  SET_STATE = "SET_STATE",
  SET_ACTIVE_LIST = "SET_ACTIVE_LIST",
  ADD_LIST = "ADD_LIST",
  REMOVE_LIST = "REMOVE_LIST",
  CHANGE_LIST_TITLE = "CHANGE_LIST_TITLE",
  ADD_TASK = "ADD_TASK",
  REMOVE_TASK = "REMOVE_TASK",
  CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE",
  CHECK_TASK = "CHECK_TASK",
}

export type InitialState = {
  lists: ListsType;
  tasks: TasksType;
  colors: ColorsType;
  activeList: ListType | null;
};

export const initialState: InitialState = {
  lists: [],
  tasks: [],
  colors: [],
  activeList: null,
};

export const StoreReducer = (
  state: InitialState = initialState,
  action: ActionsType
): InitialState => {
  switch (action.type) {
    case ActionType.SET_STATE:
      return action.payload;
    //BEGIN LIST
    case ActionType.ADD_LIST: {
      const { title: name, listId: id, colorId } = action;
      const newList = {
        id,
        name,
        colorId,
        tasks: [],
        color: findColor(state.colors, colorId),
      };
      const newLists = [...state.lists, newList];
      server.lists.setLists(newLists, "Sorry, I can't add the list");
      return { ...state, lists: newLists };
    }

    case ActionType.REMOVE_LIST: {
      const newLists = state.lists.filter((item) => item.id !== action.id);
      server.lists.setLists(
        newLists,
        "Something is wrong. I can't delete this list"
      );
      return { ...state, lists: newLists };
    }

    case ActionType.CHANGE_LIST_TITLE: {
      const { listId, title } = action;
      const newLists = state.lists.map((list) => {
        if (list.id === listId) {
          return { ...list, name: title };
        }
        return list;
      });
      server.lists.setLists(
        newLists,
        "Something is wrong. I can't change the name of list"
      );

      return { ...state, lists: newLists };
    }
    //END LIST
    //BEGIN TASK
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
        if (list.id === listId) {
          return { ...list, tasks: [...list.tasks, newTask] };
        }
        return list;
      });
      const newTasks: TasksType = [...state.tasks, newTask];

      server.tasks.addTasks(newTasks, then, callback);

      return { ...state, lists: newLists, tasks: newTasks };
    }

    case ActionType.REMOVE_TASK: {
      const { listId, taskId } = action;
      const newLists: ListsType = state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: [...list.tasks.filter((task) => task.id !== taskId)],
          };
        }
        return list;
      });
      const newTasks: TasksType = state.tasks.filter(
        (task) => task.id !== taskId
      );

      server.tasks.setTasks(
        newTasks,
        "Something is wrong. I can't delete this task"
      );
      return { ...state, lists: newLists, tasks: newTasks };
    }

    case ActionType.CHANGE_TASK_TITLE: {
      const { listId, taskId, value } = action;
      const newLists: ListsType = changeTask.ofLists(
        state.lists,
        listId,
        taskId,
        "text",
        value
      );
      const newTasks: TasksType = changeTask.ofTasks(
        state.tasks,
        taskId,
        "text",
        value
      );

      server.tasks.setTasks(
        newTasks,
        "Something is wrong. I can't change the text of task"
      );
      return { ...state, lists: newLists, tasks: newTasks };
    }

    case ActionType.CHECK_TASK: {
      const { listId, taskId, completed } = action;
      const newLists: ListsType = changeTask.ofLists(
        state.lists,
        listId,
        taskId,
        "completed",
        completed
      );
      const newTasks: TasksType = changeTask.ofTasks(
        state.tasks,
        taskId,
        "completed",
        completed
      );

      server.tasks.setTasks(
        newTasks,
        "Something is wrong. I can't tick the task"
      );

      return { ...state, lists: newLists, tasks: newTasks };
    }
    //END TASK

    case ActionType.SET_ACTIVE_LIST: {
      const { url } = action;
      let newState;

      if (url === "/") newState = { ...state, activeList: null };
      else {
        const listId: number = Number(url.split("/lists/")[1]);
        const activeList =
          state.lists.find((list) => list.id === listId) || null;
        newState = { ...state, activeList };
      }
      return newState;
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
  //BEGIN LIST
  addList: (title: string, colorId: number, listId: number) =>
    ({
      type: ActionType.ADD_LIST,
      title,
      colorId,
      listId,
    } as const),
  removeList: (id: number | string) =>
    ({
      type: ActionType.REMOVE_LIST,
      id,
    } as const),
  changeListTitle: (listId: number, title: string) =>
    ({
      type: ActionType.CHANGE_LIST_TITLE,
      listId,
      title,
    } as const),
  //END LIST
  //BEGIN TASK
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
  removeTask: (listId: number, taskId: number) =>
    ({
      type: ActionType.REMOVE_TASK,
      listId,
      taskId,
    } as const),
  changeTaskTitle: (listId: number, taskId: number, value: string | number) =>
    ({
      type: ActionType.CHANGE_TASK_TITLE,
      listId,
      taskId,
      value,
    } as const),
  checkTask: (listId: number, taskId: number, completed: boolean) =>
    ({
      type: ActionType.CHECK_TASK,
      listId,
      taskId,
      completed,
    } as const),
  //END TASK

  setActiveList: (url: string) =>
    ({
      type: ActionType.SET_ACTIVE_LIST,
      url,
    } as const),
};
