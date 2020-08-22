import React from 'react';
import Badge from "../Badge/Badge";
import RemoveIcon from "../Icons/RemoveIcon";
import axios from 'axios';

import './List.scss'

const List = ({items, isRemovable, onRemove, onClickItem, activeItem}) => {
	
	const removeList = (id) => {
		if(window.confirm('Do you really want to delete this list?')) {
			axios
				.delete(`http://localhost:3001/lists/${id}`)
				.then(() => {
					onRemove(id)
				})
			
		}
	}
	
	return (
		<ul className="list">
			{
				items.map(item => {
					const isActive = activeItem ? (activeItem.id === item.id ? 'active' : null) : null
					return (
						<li 
							key={item.id} 
							className={isActive}
							onClick={onClickItem ? () => onClickItem(item) : null}
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