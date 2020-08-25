import React from 'react';
import ListIcon from "./Icons/ListIcon";
import List from "./List/List";

const TasksFolders = ({lists, onRemove, activeList, onClickList}) => (
	<>
		<List
			items={[
				{
					id: 'all',
					icon: <ListIcon/>,
					name: "All tasks"
				}
			]}
			activeList={activeList}
			onClickList={() => onClickList('', 'all')}
		/>
		<List
			items={lists}
			isRemovable
			onRemove={onRemove}
			onClickList={onClickList}
			activeList={activeList}
		/>
	</>
)

export default TasksFolders