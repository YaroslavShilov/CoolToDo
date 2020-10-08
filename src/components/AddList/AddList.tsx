import React, { useState } from "react";

import "./AddList.scss";

import Badge from "../Badge/Badge";
import CloseIcon from "../Icons/CloseIcon";
import { randomId } from "../../utils";
import AddIcon from "../Icons/AddIcon";
import List from "../List/List";
import { useStoreContext } from "../../store/StoreContext";

type Props = {
  maxListsSize: number;
};

const AddList: React.FC<Props> = ({ maxListsSize }) => {
  const { colors, addList, lists } = useStoreContext();

  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (lists.length > maxListsSize) return null;

  const showPopup = (): void => setVisiblePopup(true);
  const hidePopup = (): void => {
    setVisiblePopup(false);
    setInputValue("");
    selectColor(colors[0].id);
    setIsLoading(false);
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputValue(e.target.value);

  const onAddList = () => {
    setIsLoading(true);
    addList(inputValue.trim(), selectedColor, hidePopup);
  };

  return (
    <div className={"add-list"}>
      <List
        onClickList={showPopup}
        items={[
          {
            modificator: "__add",
            icon: <AddIcon />,
            name: "Add list",
            id: randomId(),
          },
        ]}
      />

      {visiblePopup && (
        <div className="add-list__popup">
          <div className="add-list__close" onClick={hidePopup}>
            <CloseIcon />
          </div>

          <input
            className={"field"}
            type="text"
            placeholder={"Name of list"}
            value={inputValue}
            onChange={inputChangeHandler}
          />

          <ul className="add-list__colors">
            {colors.map((color) => (
              <li
                key={color.id}
                onClick={() => selectColor(color.id)}
                className={color.id === selectedColor ? "active" : ""}
              >
                <Badge color={color.color} />
              </li>
            ))}
          </ul>
          <button
            className={"button"}
            onClick={onAddList}
            disabled={!inputValue || isLoading}
          >
            {isLoading ? "Loading..." : "Add"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
