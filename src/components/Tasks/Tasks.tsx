import React from "react";

import "./Tasks.scss";

import EditIcon from "../Icons/EditIcon";
import { AddTaskForm } from "./AddTaskForm";
import { Task } from "./Task";
import { ListType } from "../../types/types";
import { useStoreContext } from "../../store/StoreContext";

type Props = {
  list: ListType;
  withoutEmpty?: boolean;
};

const Tasks: React.FC<Props> = ({ list, withoutEmpty }) => {
  const {
    changeListTitle,
    changeTaskTitle,
    removeTask,
    checkTask,
  } = useStoreContext();

  const editTitle = () => {
    const newTitle: string | null = window.prompt(
      "Write a new name",
      list.name
    );
    if (newTitle) changeListTitle(list.id, newTitle);
  };

  return (
    <div className="tasks">
      <h2 className={"tasks__title"} style={{ color: list.color }}>
        {list.name}
        <span className="tasks__title-icon" onClick={editTitle}>
          <EditIcon />
        </span>
      </h2>

      {!list.tasks.length && !withoutEmpty && (
        <h3 className={"tasks__empty"}>There aren't any tasks</h3>
      )}

      <ul className="tasks__items">
        {list.tasks.map(({ id, text, completed }) => (
          <Task
            key={id}
            id={id}
            text={text}
            completed={completed}
            removeTask={() => removeTask(list.id, id)}
            changeTaskTitle={(value: string) =>
              changeTaskTitle(list.id, id, value)
            }
            checkTask={() => checkTask(list.id, id, !completed)}
          />
        ))}
      </ul>

      <AddTaskForm key={list.id} list={list} />
    </div>
  );
};

export default Tasks;
