import React from 'react';
import ListIcon from "./Icons/ListIcon";
import List from "./List/List";
import {randomId} from "../utils";

const TasksFolders = ({lists, onRemove}) => (
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
		/>
	</>
)

export default TasksFolders