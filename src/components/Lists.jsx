import React from 'react';
import ListIcon from "./Icons/ListIcon";
import List from "./List/List";

const Lists = ({lists, onRemoveList, activeList, onClickList}) => (
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
			onRemoveList={onRemoveList}
			onClickList={onClickList}
			activeList={activeList}
		/>
	</>
)

export default Lists