import React from 'react';
import ListIcon from "./Icons/ListIcon";
import List from "./List/List";
import {randomId} from "../utils";

const TasksFolders = ({lists, onRemove, onClickItem, activeItem}) => (
	<>
		<List
			items={[
				{
					id: randomId(),
					icon: <ListIcon/>,
					name: "All tasks"
				}
			]}
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