import React, { useEffect, useState } from "react";
import CheckIcon from "../Icons/CheckIcon";
import EditIcon from "../Icons/EditIcon";
import RemoveIcon from "../Icons/RemoveIcon";
import TrashIcon from "../Icons/TrashIcon";

type Props = {
  id: number;
  text: string;
  completed: boolean;
  onRemoveTask: () => void;
  onEditTask: (value: string) => void;
  onCheckTask: () => void;
};

export const Task: React.FC<Props> = ({
  id,
  text,
  completed,
  onRemoveTask,
  onEditTask,
  onCheckTask,
}) => {
  const [isRemove, setIsRemove] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState<string>(text);
  const [checkIconClass, setCheckIconClass] = useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const onRemoveHandler = (): void => setIsRemove(!isRemove);
  const onEditHandler = (): void => setIsEdit(!isEdit);

  const agreeHandler = () => {
    if (isEdit) {
      if (value.trim() !== text) {
        onEditTask(value.trim());
      }
      setIsEdit(false);
    }
    if (isRemove) onRemoveTask();
  };
  const refuseHandler = () => {
    setIsEdit(false);
    setIsRemove(false);
    setValue(text);
  };

  useEffect(() => {
    if (isRemove) setCheckIconClass("remove");
    if (isEdit) setCheckIconClass("edit");
  }, [isRemove, isEdit]);

  return (
    <li className={isRemove || isEdit ? "active" : ""}>
      <div className="checkbox">
        <input
          type="checkbox"
          id={`task-${id}`}
          checked={completed}
          onChange={onCheckTask}
        />
        <label htmlFor={`task-${id}`}>
          <CheckIcon />
        </label>
      </div>

      <input
        type="text"
        value={value}
        readOnly={!isEdit}
        onChange={onChangeHandler}
      />

      <div className="tasks__actions">
        {isRemove || isEdit ? (
          <>
            {value.trim().length ? (
              <div onClick={agreeHandler} className={checkIconClass}>
                <CheckIcon />
              </div>
            ) : null}
            <div onClick={refuseHandler}>
              <RemoveIcon />
            </div>
          </>
        ) : (
          <>
            <div onClick={onEditHandler}>
              <EditIcon />
            </div>
            <div onClick={onRemoveHandler}>
              <TrashIcon />
            </div>
          </>
        )}
      </div>
    </li>
  );
};
