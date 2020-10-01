import React from "react";

import "./Tasks.scss";

import EditIcon from "../Icons/EditIcon";
import { AddTaskForm } from "./AddTaskForm";
import { Task } from "./Task";
import { ListType } from "../../types/types";

type Props = {
  list: ListType;
  onEditListTitle: (listId: number, title: string) => Promise<void>;
  onAddTask: (
    listId: number,
    text: string,
    then: () => void,
    callback: () => void
  ) => void;
  withoutEmpty?: boolean;
  onRemoveTask: (listId: number, taskId: number) => Promise<void>;
  onEditTask: (
    listId: number,
    taskId: number,
    value: string | number
  ) => Promise<void>;
  onCheckTask: (
    listId: number,
    taskId: number,
    completed: boolean
  ) => Promise<void>;
};

const Tasks: React.FC<Props> = ({
  list,
  onEditListTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCheckTask,
}) => {
  const editTitle = () => {
    const newTitle: string | null = window.prompt(
      "Write a new name",
      list.name
    );
    if (newTitle) onEditListTitle(list.id, newTitle).then();
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
            onRemoveTask={() => onRemoveTask(list.id, id)}
            onEditTask={(value: string) => onEditTask(list.id, id, value)}
            onCheckTask={() => onCheckTask(list.id, id, !completed)}
          />
        ))}
      </ul>

      <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
    </div>
  );
};

export default Tasks;
