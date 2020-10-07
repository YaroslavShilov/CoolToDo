import React, { useEffect, useState } from "react";
import Tasks from "./components/Tasks/Tasks";
import Sidebar from "./components/Sidebar";
import { Route, useHistory, useLocation } from "react-router-dom";
import { History, Location } from "history";
import { ColorsType, ListsType, ListType, TasksType } from "./types/types";
import { changeTask, localStorageSetItem } from "./utils";
import { useStoreContext } from "./store/StoreContext";

const App: React.FC = () => {
  let history = useHistory<History>();
  let location = useLocation<Location>();

  const {
    state,
    postDefaultDB,
    addList,
    addTask,
    removeTask,
    removeList,
    changeListTitle,
    changeTaskTitle,
  } = useStoreContext();

  const [lists, setLists] = useState<ListsType>(state.lists);
  const [colors, setColors] = useState<ColorsType>(state.colors);
  const [tasks, setTasks] = useState<TasksType>(state.tasks);
  const [activeList, setActiveList] = useState<ListType | null>(null);

  useEffect(() => {
    setLists(state.lists);
    setColors(state.colors);
    setTasks(state.tasks);
  }, [state]);

  //BEGIN List handlers

  const onClickList = (id: number | string, modif?: string): void => {
    if (modif === "all") history.push("/");
    else history.push(`/lists/${id}`);
  };

  //END List handlers

  //BEGIN Task handlers

  const onCheckTask = async (
    listId: number,
    taskId: number,
    completed: boolean
  ): Promise<void> => {
    const newLists: ListsType = changeTask.ofLists(
      lists,
      listId,
      taskId,
      "completed",
      completed
    );
    const newTasks: TasksType = changeTask.ofTasks(
      tasks,
      taskId,
      "completed",
      completed
    );

    setTasks(newTasks);
    setLists(newLists);

    try {
      await localStorageSetItem("tasks", newTasks);
    } catch {
      alert("something is wrong. I cannot tick the task");
    }
  };
  //END Task handlers

  useEffect(() => {
    if (location.pathname === "/") {
      return setActiveList(null);
    }
    const listId: number = Number(location.pathname.split("/lists/")[1]);
    if (lists) {
      const list = lists.find((list) => list.id === listId) || null;
      setActiveList(list);
    }
  }, [location.pathname, lists]);

  const isLists: boolean = lists.length > 0;
  const isColors: boolean = colors.length > 0;

  return (
    <main className={"todo"}>
      <button className={"defaultDB"} onClick={postDefaultDB}>
        Default DB
      </button>
      {isLists && isColors ? (
        <Sidebar
          lists={lists}
          colors={colors}
          onAddList={addList}
          onRemoveList={removeList}
          activeList={activeList}
          onClickList={onClickList}
        />
      ) : (
        "Loading..."
      )}
      <div className="todo__tasks">
        <Route path={"/"} exact>
          {isLists &&
            lists.map((list) => (
              <Tasks
                key={list.id}
                list={list}
                onChangeListTitle={changeListTitle}
                onAddTask={addTask}
                onRemoveTask={removeTask}
                onEditTask={changeTaskTitle}
                onCheckTask={onCheckTask}
                withoutEmpty
              />
            ))}
        </Route>

        <Route path={"/lists/:id"}>
          {isLists && activeList !== null && (
            <Tasks
              list={activeList}
              onChangeListTitle={changeListTitle}
              onAddTask={addTask}
              onRemoveTask={removeTask}
              onEditTask={changeTaskTitle}
              onCheckTask={onCheckTask}
            />
          )}
        </Route>
      </div>
    </main>
  );
};

export default App;
