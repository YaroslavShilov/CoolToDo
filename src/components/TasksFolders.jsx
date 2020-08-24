import React from 'react';
import ListIcon from "./Icons/ListIcon";
import List from "./List/List";

const TasksFolders = ({lists, onRemove, onClickItem, activeItem}) => (
	<>
		<List
			items={[
				{
					id: 'all',
					icon: <ListIcon/>,
					name: "All tasks"
				}
			]}
			activeItem={activeItem}
			onClickItem={onClickItem}
		/>
		<List
			items={lists}
			isRemovable
			onRemove={onRemove}
			onClickItem={onClickItem}
			activeItem={activeItem}
		/>
	</>
)

export default TasksFolders