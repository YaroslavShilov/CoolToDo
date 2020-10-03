import React, { useReducer } from "react";
import { StoreContext } from "../StoreContext";
import { useHistory, useLocation } from "react-router-dom";
import { History, Location } from "history";
import { DefaultDB } from "../../types/types";
import { defaultDataBase } from "../../defaultDB";
import {
  ActionsType,
  getDB,
  initialState,
  InitialState,
  postDefaultDB,
  reducer,
} from "../reducer";

const defaultDB: DefaultDB = defaultDataBase;

type Props = {
  children: React.ReactNode;
};

export const StoreProvide: React.FC<Props> = ({ children }) => {
  let history = useHistory<History>();
  let location = useLocation<Location>();

  type Reducer = React.Reducer<InitialState, ActionsType>;
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

  console.log("provide state", state);
  const postDB = async () => {
    //TODO: dispatch
    await postDefaultDB(defaultDB);
    history.push(`/`);
    //history.go(0);
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        postDB,
        getDB,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
