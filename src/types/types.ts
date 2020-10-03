export type DefaultDB = {
  lists: DefListsType;
  tasks: TasksType;
  colors: ColorsType;
};

export type ListsType = Array<ListType>;
export type ListType = DefListType & { color: string };

export type TasksType = Array<TaskType>;
export type TaskType = {
  listId: number;
  text: string;
  completed: boolean;
  id: number;
};

export type DefListsType = Array<DefListType>;
export type DefListType = {
  name: string;
  colorId: number;
  tasks: TasksType;
  id: number;
};

export type ColorsType = Array<ColorType>;
export type ColorType = {
  id: number;
  color: string;
  name: string;
};

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;
