import React, { useState } from "react";
import AddIcon from "../Icons/AddIcon";
import { ListType } from "../../types/types";

type Props = {
  list: ListType;
  onAddTask: (
    listId: number,
    text: string,
    then: () => void,
    callback: () => void
  ) => void;
};

export const AddTaskForm: React.FC<Props> = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormVisible = (): void => {
    setVisibleForm(!visibleForm);
    setInputValue("");
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTask = (): void => {
    setIsLoading(true);

    onAddTask(list.id, inputValue.trim(), toggleFormVisible, () =>
      setIsLoading(false)
    );
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div className="tasks__form-new" onClick={toggleFormVisible}>
          <AddIcon />
          <p>New Task</p>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            className={"field"}
            type="text"
            value={inputValue}
            placeholder={"Task..."}
            onChange={onChangeHandler}
          />
          <button
            className={"button"}
            onClick={addTask}
            disabled={!inputValue || isLoading}
          >
            {isLoading ? "Loading..." : "Add"}
          </button>
          {!isLoading && (
            <button
              className={"button __grey"}
              disabled={isLoading}
              onClick={toggleFormVisible}
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
};
