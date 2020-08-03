import React from 'react';
import ListIcon from "./Icons/ListIcon";
import List from "./List/List";

const TasksFolders = () => (
	<>
		<List
			items={[
				{
					icon: <ListIcon/>,
					name: "All tasks"
				}
			]}
		/>
		<List
			items={[
				{
					color: 'tomato',
					name: 'Shopping'
				},
				{
					color: '#c7c7c7',
					name: 'Work',
					active: true
				}
			]}
			isRemovable
		/>
	</>
)

export default TasksFolders