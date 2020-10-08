import React from "react";
import ListIcon from "./Icons/ListIcon";
import List from "./List/List";
import { useStoreContext } from "../store/StoreContext";

const Lists: React.FC = () => {
  const { lists, removeList, activeList } = useStoreContext();
  return (
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
      />
      <List
        items={lists}
        isRemovable
        removeList={removeList}
        activeList={activeList}
      />
    </>
  );
};

export default Lists;
