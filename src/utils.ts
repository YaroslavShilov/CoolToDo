import { ColorsType, DefaultDB, ListsType, TasksType } from "./types/types";
import { defaultDataBase } from "./defaultDB";
const defaultDB: DefaultDB = defaultDataBase;

export const randomId = (): number => {
  return +new Date();
};

export const findColor = (colors: ColorsType, colorId: number): string => {
  const findColor = colors.find((color) => color.id === colorId);
  return findColor ? findColor.color : "#000000";
};

export const localStorageGetItem = async <T, K extends keyof DefaultDB>(
  key: K
): Promise<T> => {
  return await JSON.parse(
    localStorage.getItem(key) || JSON.stringify(defaultDB[key])
  );
};

export const localStorageSetItem = async <K extends keyof DefaultDB>(
  key: K,
  obj: DefaultDB[K]
): Promise<void> => {
  await localStorage.setItem(key, JSON.stringify(obj));
};

export const localStoragePostDefault = async <K extends keyof DefaultDB>(
  key: K
): Promise<void> => {
  await localStorage.setItem(key, JSON.stringify(defaultDB[key]));
};

//BEGIN changeTask
export const changeTask = {
  //this method changes task of tasks (state.tasks), not task of list.tasks (state.lists[listId].tasks)
  ofTasks: (
    tasks: TasksType,
    taskId: number,
    key: string,
    value: number | string | boolean
  ): TasksType => {
    return tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          [key]: value,
        };
      }
      return task;
    });
  },

  //this method changes task of list.tasks (state.lists[listId].tasks), not task of tasks (state.tasks)
  ofLists: function (
    lists: ListsType,
    listId: number,
    taskId: number,
    key: string,
    value: string | number | boolean
  ): ListsType {
    return lists.map((list) => {
      if (list.id === listId) {
        const newTasks: TasksType = this.ofTasks(
          list.tasks,
          taskId,
          key,
          value
        );
        return { ...list, tasks: [...newTasks] };
      }
      return list;
    });
  },
};
//END changeTask
