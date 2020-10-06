import { ListsType, TasksType } from "../types/types";
import { localStorageSetItem } from "../utils";

export const server = {
  addLists: (lists: ListsType) => localStorageSetItem("lists", lists),
  addTasks: async (
    tasks: TasksType,
    then: () => void,
    callback: () => void
  ) => {
    try {
      await localStorageSetItem("tasks", tasks);
    } catch {
      alert("Sorry, We weren't able to add this task");
    }
    callback();
  },
};
