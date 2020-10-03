import {
  ColorsType,
  DefaultDB,
  DefListsType,
  InferValueTypes,
  ListsType,
  TasksType,
} from "../types/types";
import { findColor, localStorageGetItem, localStorageSetItem } from "../utils";

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

export const getDB = async (): Promise<void> => {
  //this method is for get DB from LocalStorage
  //use it one time in useEffect or after postDefaultDB for reload state

  //this defLists(DefListsType) isn't like lists(ListsType) for state
  //you need to change this defLists like state lists (ListsType)
  const defLists: DefListsType = await localStorageGetItem("lists");
  const tasks: TasksType = await localStorageGetItem("tasks");
  const colors: ColorsType = await localStorageGetItem("colors");

  //create normal lists for state
  const lists: ListsType = defLists.map((defList) => {
    //find tasks for this list
    const listTasks: TasksType = tasks.filter(
      (task) => task.listId === defList.id
    );
    //find colors for this list
    const listColor: string = findColor(colors, defList.colorId);
    //return normal list
    return { ...defList, tasks: listTasks, color: listColor };
  });
  console.log("getDB");
  actions.setState({ lists, tasks, colors });
};

export const postDefaultDB = async (db: DefaultDB): Promise<void> => {
  //post DefaultDB from defaultDB.js to LocalStorage
  //this method is for to come back default state
  await localStorageSetItem("lists", db["lists"]);
  await localStorageSetItem("colors", db["tasks"]);
  await localStorageSetItem("colors", db["colors"]);
  await getDB();
};
