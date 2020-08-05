import React from 'react';
import TasksFolders from "./TasksFolders";
import AddList from "./AddList/AddList";

const Sidebar = ({lists, colors, onAddList}) => {
	return (
		<aside className="sidebar">
			<TasksFolders lists={lists}/>
			<AddList
				colors={colors}
				onAdd={onAddList}
			/>
		</aside>
	);
}

export default Sidebar