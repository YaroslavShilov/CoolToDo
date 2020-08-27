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
				onAddList={onAddList}
				maxListsSize={10}
				currentListsSize={lists.length}
			/>


		</aside>
	);
}

export default Sidebar