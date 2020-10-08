import React from "react";
import Badge from "../Badge/Badge";
import RemoveIcon from "../Icons/RemoveIcon";

import "./List.scss";
import { ListType, TasksType } from "../../types/types";
import { useHistory, useLocation } from "react-router-dom";
import { History } from "history";

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
  removeList?: (id: number | string) => void;
  activeList?: ListType | null;
  isRemovable?: boolean;
  onClickList?: () => void;
};

const List: React.FC<Props> = ({
  items,
  isRemovable,
  removeList,
  activeList,
  onClickList,
}) => {
  const history = useHistory<History>();
  const location = useLocation<Location>();

  const isActive = (item: ItemType): string => {
    if (!activeList) {
      return item.id === "all" ? "active" : "";
    }
    return activeList.id === item.id ? "active" : "";
  };

  const defOnClickList = (id: number | string) => {
    if (onClickList) onClickList();
    else {
      const { pathname } = location;
      const activeListId: string = pathname.split("/lists/")[1];

      const isActiveList = activeListId === id.toString();
      const isMainPage = pathname === "/" && id.toString() === "all";

      if (!isActiveList && !isMainPage) {
        if (id === "all") history.push("/");
        else history.push(`/lists/${id}`);
      }
    }
  };

  return (
    <ul className="list">
      {items.map((item) => {
        return (
          <li
            key={item.id}
            className={isActive(item)}
            onClick={() => defOnClickList(item.id)}
          >
            <Badge
              icon={item.icon}
              modificator={item.modificator}
              color={item.color}
            />
            <span>{item.name}</span>
            {item.tasks && <strong>{item.tasks.length}</strong>}
            {isRemovable && removeList && (
              <div
                className="list__close"
                onClick={(e) => {
                  e.stopPropagation();
                  removeList(item.id);
                }}
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
