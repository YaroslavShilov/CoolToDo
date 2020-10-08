import React, { useState } from "react";
import AddIcon from "../Icons/AddIcon";
import { ListType } from "../../types/types";
import { useStoreContext } from "../../store/StoreContext";

type Props = {
  list: ListType;
};

export const AddTaskForm: React.FC<Props> = ({ list }) => {
  const { addTask } = useStoreContext();

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

  const onAddTask = (): void => {
    setIsLoading(true);

    addTask(list.id, inputValue.trim(), toggleFormVisible, () =>
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
            onClick={onAddTask}
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
