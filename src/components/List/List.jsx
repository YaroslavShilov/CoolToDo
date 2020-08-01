import React from 'react';

const List = ({items}) => {
	return (
		<ul className="list">
			
			{
				items.map(item => {
					const icon = item.icon
						? <span>{item.icon}</span>
						: <span style={{
							backgroundColor: item.color,
							borderRadius: '50%',
						}}></span>
					
					return (
						<li key={item.name}>
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