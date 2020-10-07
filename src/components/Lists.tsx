import React from "react";
import ListIcon from "./Icons/ListIcon";
import List from "./List/List";
import { ListsType, ListType } from "../types/types";

type Props = {
  lists: ListsType;
  onRemoveList: (id: number | string) => void;
  activeList: ListType | null;
  onClickList: (id: number | string, modif?: string) => void;
};

const Lists: React.FC<Props> = ({
  lists,
  onRemoveList,
  activeList,
  onClickList,
}) => (
  <>
    <List
      items={[
        {
          id: "all",
          icon: <ListIcon />,
          name: "All tasks",
        },
      ]}
      activeList={activeList}
      onClickList={() => onClickList("", "all")}
    />
    <List
      items={lists}
      isRemovable
      onRemoveList={onRemoveList}
      onClickList={onClickList}
      activeList={activeList}
    />
  </>
);

export default Lists;
