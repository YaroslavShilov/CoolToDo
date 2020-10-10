import React, { useCallback, useReducer } from "react";
import { StoreContext } from "./StoreContext";
import { useHistory, useLocation } from "react-router-dom";
import { History, Location } from "history";
import {
  ColorsType,
  DefListsType,
  ListsType,
  TasksType,
} from "../types/types";
import {
  actions,
  ActionsType,
  initialState,
  InitialState,
  StoreReducer,
} from "./StoreReducer";
import {
  findColor,
  localStorageGetItem,
  localStoragePostDefault,
} from "../utils";

type Props = {
  children: React.ReactNode;
};

export const StoreProvider: React.FC<Props> = ({ children }) => {
  let history = useHistory<History>();
  let location = useLocation<Location>();

  type Reducer = React.Reducer<InitialState, ActionsType>;
  const [state, dispatch] = useReducer<Reducer>(StoreReducer, initialState);

  //BEGIN setActiveList
  const setActiveList = useCallback((url: string): void => {
    dispatch(actions.setActiveList(url));
    //eslint-disable-next-line
  }, []);
  //END setActiveList

  //BEGIN addList
  const addList = (
    title: string,
    colorId: number,
    callback: () => void
  ): void => {
    const listId = state.lists.length + 1;
    dispatch(actions.addList(title, colorId, listId));
    history.push(`/lists/${listId}`);
    callback();
  };
  //END addList

  //BEGIN removeList
  const removeList = (id: number | string): void => {
    if (window.confirm("Do you really want to delete this list?")) {
      dispatch(actions.removeList(id));
      history.push("/");
    }
  };
  //END removeList

  //BEGIN changeListTitle
  const changeListTitle = (listId: number, title: string): void => {
    dispatch(actions.changeListTitle(listId, title));
  };
  //END changeListTitle

  //BEGIN addTask
  const addTask = (
    listId: number,
    text: string,
    then: () => void,
    callback: () => void
  ): void => {
    dispatch(actions.addTask(listId, text, then, callback));
  };
  //END addTask

  //BEGIN removeTask
  const removeTask = (listId: number, taskId: number): void => {
    dispatch(actions.removeTask(listId, taskId));
  };
  //END removeTask

  //BEGIN changeTaskTitle
  const changeTaskTitle = (
    listId: number,
    taskId: number,
    value: string | number
  ): void => {
    dispatch(actions.changeTaskTitle(listId, taskId, value));
  };
  //END changeTaskTitle

  //BEGIN checkTask
  const checkTask = (
    listId: number,
    taskId: number,
    completed: boolean
  ): void => {
    dispatch(actions.checkTask(listId, taskId, completed));
  };
  //END checkTask

  //BEGIN getDB
  const getDB = useCallback(async (): Promise<void> => {
    //this method is for get DB from LocalStorage
    //use it one time in useEffect or in postDefaultDB for reload DB

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

    dispatch(actions.setState({ lists, tasks, colors, activeList: null }));
    setActiveList(location.pathname);
    //eslint-disable-next-line
  }, []);
  //END getDB

  //BEGIN postDefaultDB
  const postDefaultDB = async (): Promise<void> => {
    //post DefaultDB from defaultDB.js to LocalStorage
    //this method is for to come back default state
    await localStoragePostDefault("lists");
    await localStoragePostDefault("tasks");
    await localStoragePostDefault("colors");
    await getDB();
    if (location.pathname !== "/") history.push(`/`);
  };
  //END postDefaultDB

  return (
    <StoreContext.Provider
      value={{
        ...state,
        setActiveList,
        getDB,
        postDefaultDB,
        addList,
        addTask,
        removeTask,
        removeList,
        changeListTitle,
        changeTaskTitle,
        checkTask,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
