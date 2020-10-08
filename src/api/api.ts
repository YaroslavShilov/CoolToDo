import { ListsType, TasksType } from "../types/types";
import { localStorageSetItem } from "../utils";

export const server = {
  lists: {
    setLists: async (newLists: ListsType, errorMessage: string = "") => {
      try {
        await localStorageSetItem("lists", newLists);
      } catch (e) {
        alert(errorMessage);
      }
    },
  },
  tasks: {
    setTasks: async (newTasks: TasksType, errorMessage: string = "") => {
      try {
        await localStorageSetItem("tasks", newTasks);
      } catch {
        alert(errorMessage);
      }
    },

    addTasks: async (
      tasks: TasksType,
      then: () => void,
      callback: () => void
    ) => {
      try {
        await localStorageSetItem("tasks", tasks);
        then();
      } catch {
        alert("Sorry, We weren't able to add this task");
      }
      callback();
    },
  },
};
