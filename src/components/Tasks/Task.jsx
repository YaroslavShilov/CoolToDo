import React from 'react';
import CheckIcon from "../Icons/CheckIcon";

export const Task = ({id, text, completed}) => {
	return (
		<li>
			<div className="checkbox">
				<input
					type="checkbox"
					id={`task-${id}`}

					//**TODO: checked={completed}**/
				/>
				<label htmlFor={`task-${id}`}>
					<CheckIcon/>
				</label>
			</div>

			<input
				type="text"
				value={text}
				readOnly
			/>
		</li>
	);
}
