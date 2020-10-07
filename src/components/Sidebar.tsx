import React from "react";
import Lists from "./Lists";
import AddList from "./AddList/AddList";
import { ColorsType, ListsType, ListType } from "../types/types";

type Props = {
  lists: ListsType;
  colors: ColorsType;
  onAddList: (title: string, colorId: number, callback: () => void) => void;
  onRemoveList: (id: number | string) => void;
  activeList: ListType | null;
  onClickList: (id: number | string, modif?: string) => void;
};

const Sidebar: React.FC<Props> = ({
  lists,
  colors,
  onAddList,
  onRemoveList,
  activeList,
  onClickList,
}) => {
  return (
    <aside className="sidebar">
      <Lists
        lists={lists}
        onRemoveList={onRemoveList}
        activeList={activeList}
        onClickList={onClickList}
      />

      <AddList
        colors={colors}
        onAddList={onAddList}
        maxListsSize={10}
        currentListsSize={lists.length}
      />
    </aside>
  );
};

export default Sidebar;
