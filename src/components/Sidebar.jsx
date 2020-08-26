import React from 'react';
import Lists from "./Lists";
import AddList from "./AddList/AddList";

const Sidebar = ({lists, colors, onAddList, onRemoveList, activeList, onClickList}) => {
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
				onAdd={onAddList}
			/>
		</aside>
	);
}

export default Sidebar