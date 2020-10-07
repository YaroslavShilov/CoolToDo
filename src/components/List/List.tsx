import React from "react";
import Badge from "../Badge/Badge";
import RemoveIcon from "../Icons/RemoveIcon";

import "./List.scss";
import { ListType, TasksType } from "../../types/types";

type ItemType = {
  id: string | number;
  icon?: React.ReactNode;
  name: string;
  colorId?: number;
  tasks?: TasksType;
  color?: string;
  modificator?: string;
};

type Props = {
  items: ItemType[];
  onRemoveList?: (id: number | string) => void;
  activeList?: ListType | null;
  onClickList: (id: number | string, modif?: string) => void;
  isRemovable?: boolean;
};

const List: React.FC<Props> = ({
  items,
  isRemovable,
  onRemoveList,
  onClickList,
  activeList,
}) => {
  const isActive = (item: ItemType): string => {
    if (!activeList) {
      return item.id === "all" ? "active" : "";
    }
    return activeList.id === item.id ? "active" : "";
  };

  return (
    <ul className="list">
      {items.map((item) => {
        return (
          <li
            key={item.id}
            className={isActive(item)}
            onClick={() => onClickList(item.id)}
          >
            <Badge
              icon={item.icon}
              modificator={item.modificator}
              color={item.color}
            />
            <span>{item.name}</span>
            {item.tasks && <strong>{item.tasks.length}</strong>}
            {isRemovable && onRemoveList && (
              <div
                className="list__close"
                onClick={() => onRemoveList(item.id)}
              >
                <RemoveIcon />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
