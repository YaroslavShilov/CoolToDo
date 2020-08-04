import React from 'react';

import './Badge.scss'

const getModificator = modificator => modificator ? modificator : '';

const Badge = ({icon, color, modificator=false}) => {
	return (
		icon
			? <span className={`badge ${getModificator(modificator)}`}>
					{icon}
				</span>
			: <span
					className={'badge __circle'}
					style={{backgroundColor: color}}
				></span>
	);
}

export default Badge