import React, { useEffect } from "react";
import Tasks from "./components/Tasks/Tasks";
import Sidebar from "./components/Sidebar";
import { Route, useLocation } from "react-router-dom";
import { Location } from "history";
import { useStoreContext } from "./store/StoreContext";

const App: React.FC = () => {
  let location = useLocation<Location>();

  const {
    lists,
    colors,
    activeList,
    setActiveList,
    getDB,
    postDefaultDB,
  } = useStoreContext();

  useEffect(() => {
    getDB();
  }, [getDB]);

  useEffect(() => {
    setActiveList(location.pathname);
  }, [location.pathname, lists, setActiveList]);

  const isLists: boolean = lists.length > 0;
  const isColors: boolean = colors.length > 0;

  return (
    <main className={"todo"}>
      <button className={"defaultDB"} onClick={postDefaultDB}>
        Default DB
      </button>

      {isLists && isColors ? <Sidebar /> : "Loading..."}

      <div className="todo__tasks">
        <Route path={"/"} exact>
          {isLists &&
            lists.map((list) => (
              <Tasks key={list.id} list={list} withoutEmpty />
            ))}
        </Route>

        <Route path={"/lists/:id"}>
          {isLists && activeList !== null && <Tasks list={activeList} />}
        </Route>
      </div>
    </main>
  );
};

export default App;
