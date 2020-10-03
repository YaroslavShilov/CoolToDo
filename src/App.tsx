import React, { useEffect, useState } from "react";
import Tasks from "./components/Tasks/Tasks";
import Sidebar from "./components/Sidebar";
import { Route, useHistory, useLocation } from "react-router-dom";
import { defaultDataBase } from "./defaultDB";
import { History, Location } from "history";
import {
  ColorsType,
  DefaultDB,
  DefListsType,
  ListsType,
  ListType,
  TasksType,
  TaskType,
} from "./types/types";
import { findColor, localStorageGetItem, localStorageSetItem } from "./utils";
import { useStoreContext } from "./store/StoreContext";

const App: React.FC = () => {
  let history = useHistory<History>();
  let location = useLocation<Location>();

  const { state, postDB, getDB } = useStoreContext();

  const [lists, setLists] = useState<ListsType>(state.lists);
  const [colors, setColors] = useState<ColorsType>(state.colors);
  const [tasks, setTasks] = useState<TasksType>(state.tasks);
  const [activeList, setActiveList] = useState<ListType | null>(null);

  useEffect(() => {
    console.log("App getDB");
    getDB();
  }, [getDB]);

  //BEGIN List handlers

  const onAddList = (
    title: string,
    colorId: number,
    callback: () => void
  ): void => {
    const id = lists.length + 1;
    const newLists: ListsType = [
      ...lists,
      {
        id,
        name: title,
        colorId: colorId,
        tasks: [],
        color: findColor(colors, colorId),
      },
    ];

    (async function () {
      await localStorageSetItem("lists", newLists);
      setLists(newLists);
      history.push(`/lists/${id}`);
      callback();
    })();
  };

  const onClickList = (id: number | string, modif?: string): void => {
    if (modif === "all") history.push("/");
    else history.push(`/lists/${id}`);
  };

  const onRemoveList = async (id: number | string): Promise<void> => {
    if (window.confirm("Do you really want to delete this list?")) {
      const newLists = lists.filter((item) => item.id !== id);

      try {
        await localStorageSetItem("lists", newLists);
        setLists(newLists);
        history.push("/");
      } catch {
        alert("Something is wrong. I can't delete this list");
      }
    }
  };

  const onEditListTitle = async (
    listId: number,
    title: string
  ): Promise<void> => {
    const newList = lists.map((list) => {
      if (list.id === listId) list.name = title;
      return list;
    });

    setLists(newList);

    try {
      await localStorageSetItem("lists", lists);
    } catch {
      alert("something is wrong. I cannot change the name of list");
    }
  };
  //END List handlers

  //BEGIN Task handlers
  const onAddTask = (
    listId: number,
    text: string,
    then: () => void,
    callback: () => void
  ): void => {
    const id = tasks.length + 1;

    const newTask: TaskType = {
      id,
      listId,
      text,
      completed: false,
    };

    const newList: ListsType = lists.map((list) => {
      if (list.id === listId) list.tasks = [...list.tasks, newTask];
      return list;
    });
    const newTasks: TasksType = [...tasks, newTask];

    setTasks(newTasks);
    setLists(newList);

    (async function () {
      try {
        await localStorageSetItem("tasks", newTasks);
        then();
      } catch {
        alert("Sorry, We weren't able to add this task");
      }
      callback();
    })();
  };

  const onRemoveTask = async (
    listId: number,
    taskId: number
  ): Promise<void> => {
    const newLists: ListsType = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.filter((task) => task.id !== taskId);
      }
      return list;
    });

    const newTasks: TasksType = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
    setLists(newLists);

    try {
      await localStorageSetItem("tasks", newTasks);
    } catch {
      alert("something is wrong. I cannot delete this task");
    }
  };

  const changedTaskOfTasks = (
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
  };

  const changedTaskOfLists = (
    lists: ListsType,
    listId: number,
    taskId: number,
    key: string,
    value: string | number | boolean
  ): ListsType => {
    return lists.map((list) => {
      if (list.id === listId) {
        const newTasks: TasksType = changedTaskOfTasks(
          list.tasks,
          taskId,
          key,
          value
        );
        return { ...list, tasks: [...newTasks] };
      }
      return list;
    });
  };

  const onEditTask = async (
    listId: number,
    taskId: number,
    value: string | number
  ): Promise<void> => {
    const newLists: ListsType = changedTaskOfLists(
      lists,
      listId,
      taskId,
      "text",
      value
    );
    const newTasks: TasksType = changedTaskOfTasks(
      tasks,
      taskId,
      "text",
      value
    );

    setTasks(newTasks);
    setLists(newLists);

    try {
      await localStorageSetItem("tasks", newTasks);
    } catch {
      alert("something is wrong. I cannot change the text of task");
    }
  };

  const onCheckTask = async (
    listId: number,
    taskId: number,
    completed: boolean
  ): Promise<void> => {
    const newLists: ListsType = changedTaskOfLists(
      lists,
      listId,
      taskId,
      "completed",
      completed
    );
    const newTasks: TasksType = changedTaskOfTasks(
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

  console.log("state", state);
  console.log("isLists", isLists);
  console.log("isColors", isColors);

  return (
    <main className={"todo"}>
      <button className={"defaultDB"} onClick={postDB}>
        Default DB
      </button>
      {isLists && isColors ? (
        <Sidebar
          lists={lists}
          colors={colors}
          onAddList={onAddList}
          onRemoveList={onRemoveList}
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
                onEditListTitle={onEditListTitle}
                onAddTask={onAddTask}
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
                onCheckTask={onCheckTask}
                withoutEmpty
              />
            ))}
        </Route>

        <Route path={"/lists/:id"}>
          {isLists && activeList !== null && (
            <Tasks
              list={activeList}
              onEditListTitle={onEditListTitle}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCheckTask={onCheckTask}
            />
          )}
        </Route>
      </div>
    </main>
  );
};

export default App;
