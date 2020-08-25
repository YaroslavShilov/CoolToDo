import React from 'react';
import TasksFolders from "./TasksFolders";
import AddList from "./AddList/AddList";

const Sidebar = ({lists, colors, onAddList, onRemove, activeList, onClickList}) => {
	return (
		<aside className="sidebar">
			<TasksFolders 
				lists={lists} 
				onRemove={onRemove}
				activeList={activeList}
				onClickList={onClickList}
			/>

			<AddList
				colors={colors}
				onAdd={onAddList}
			/>
		</aside>
	);
}

export default Sidebar