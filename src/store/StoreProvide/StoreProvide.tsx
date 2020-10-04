import React, { useCallback, useEffect, useReducer } from "react";
import { StoreContext } from "../StoreContext";
import { useHistory, useLocation } from "react-router-dom";
import { History, Location } from "history";
import {
  ColorsType,
  DefaultDB,
  DefListsType,
  ListsType,
  TasksType,
} from "../../types/types";
import { defaultDataBase } from "../../defaultDB";
import {
  actions,
  ActionsType,
  initialState,
  InitialState,
  reducer,
} from "../reducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import {
  findColor,
  localStorageGetItem,
  localStorageSetItem,
} from "../../utils";

const defaultDB: DefaultDB = defaultDataBase;

type Props = {
  children: React.ReactNode;
};

const state = createStore(reducer, applyMiddleware(thunk));

export const StoreProvide: React.FC<Props> = ({ children }) => {
  let history = useHistory<History>();
  let location = useLocation<Location>();

  type Reducer = React.Reducer<InitialState, ActionsType>;
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

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
    dispatch(actions.setState({ lists, tasks, colors }));
  }, []);
  //END getDB

  //BEGIN postDefaultDB
  const postDefaultDB = async (): Promise<void> => {
    //post DefaultDB from defaultDB.js to LocalStorage
    //this method is for to come back default state
    await localStorageSetItem("lists", defaultDB["lists"]);
    await localStorageSetItem("tasks", defaultDB["tasks"]);
    await localStorageSetItem("colors", defaultDB["colors"]);
    await getDB();
    if (location.pathname !== "/") history.push(`/`);
  };
  //END postDefaultDB

  useEffect(() => {
    getDB();
  }, [getDB]);

  return (
    <StoreContext.Provider
      value={{
        state,
        postDefaultDB,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
