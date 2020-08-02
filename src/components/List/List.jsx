import React from 'react';
import './List.scss'

const List = ({items, isRemovable='false'}) => {
	return (
		<ul className="list">
			
			{
				items.map(item => {
					const icon = item.icon
						? <span className={`list__icon ${item.modificator}`}>{item.icon}</span>
						: <span 
								className={'list__icon __circle'}
								style={{backgroundColor: item.color}}
							></span>
					
					return (
						<li 
							key={item.name} 
							className={item.active && 'active'}
						>
							{icon}
							{item.name}
						</li>
					)
					
				})
			}

		</ul>
	);
}

export default List