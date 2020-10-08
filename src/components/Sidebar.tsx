import React from "react";
import Lists from "./Lists";
import AddList from "./AddList/AddList";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <Lists />

      <AddList maxListsSize={10} />
    </aside>
  );
};

export default Sidebar;
