import React from 'react';

import './List.scss'

const getModificator = item => item.modificator ? item.modificator : '';

const List = ({items, isRemovable='false', onClick=null}) => {
	
	return (
		<ul className="list">
			
			{
				items.map(item => {
					
					const icon = item.icon
						? <span 
								className={`list__icon ${getModificator(item)}`}
							>{item.icon}</span>
						: <span 
								className={'list__icon __circle'}
								style={{backgroundColor: item.color}}
							></span>
					
					return (
						<li 
							key={item.name} 
							className={item.active && 'active'}
							onClick={onClick}
						>
							{icon}
							<span>{item.name}</span>
						</li>
					)
					
				})
			}

		</ul>
	);
}

export default List