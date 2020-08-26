import React from 'react';
import Badge from "../Badge/Badge";
import RemoveIcon from "../Icons/RemoveIcon";
import axios from 'axios';

import './List.scss'

const List = ({items, isRemovable, onRemoveList, onClickList, activeList}) => {

	const removeList = (id) => {
		if(window.confirm('Do you really want to delete this list?')) {
			axios
				.delete(`http://localhost:3001/lists/${id}`)
				.then(() => {
					onRemoveList(id)
				})
			
		}
	}

	const isActive = (item) => {
		if(!activeList) {
			return item.id === 'all' ? 'active' : null
		}
		return activeList.id === item.id ? 'active' : null
	}

	return (
		<ul className="list">
			{
				items.map(item => {
					return (
						<li 
							key={item.id} 
							className={isActive(item)}
							onClick={onClickList ? () => onClickList(item) : null}
						>
							<Badge
								icon={item.icon}
								modificator={item.modificator}
								color={item.color}
							/>
							<span>{item.name}</span>
							{
								item.tasks && <strong>{item.tasks.length}</strong>
							}
							{isRemovable &&
								<div className="list__close" onClick={() => removeList(item.id)}>
									<RemoveIcon/>
								</div>
							}
							
						</li>
					)
					
				})
			}

		</ul>
	);
}

export default List