import React from 'react';

import './List.scss'
import Badge from "../Badge/Badge";

const List = ({items, isRemovable='false', onClick=null}) => {
	
	return (
		<ul className="list">
			
			{
				items.map(item => {
					
					return (
						<li 
							key={item.name} 
							className={item.active && 'active'}
							onClick={onClick}
						>
							<Badge
								icon={item.icon}
								modificator={item.modificator}
								color={item.color}
							/>
							<span>{item.name}</span>
						</li>
					)
					
				})
			}

		</ul>
	);
}

export default List