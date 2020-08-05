import React from 'react';
import Badge from "../Badge/Badge";
import RemoveIcon from "../Icons/RemoveIcon";

import './List.scss'

const List = ({items, isRemovable, onRemove, onClick}) => {
	const removeList = (id) => {
		if(window.confirm('Do you really want to delete this list?')) onRemove(id)
	}
	
	return (
		<ul className="list">
			{
				items.map(item => {
					return (
						<li 
							key={item.id} 
							className={item.active && 'active'}
							onClick={onClick}
						>
							<Badge
								icon={item.icon}
								modificator={item.modificator}
								color={item.color}
							/>
							<span>{item.name}</span>
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