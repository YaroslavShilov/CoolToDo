import React from 'react';
import './Tasks.scss';
import EditIcon from "../Icons/EditIcon";
import CheckIcon from "../Icons/CheckIcon";

const Tasks = () => {
	return (
		<div className="tasks">
			<h2 className={'tasks__title'}>
				Front-End
				<span className="tasks__title-icon">
					<EditIcon/>
				</span>
			</h2>
			
			<ul className="tasks__items">
				<li>
					<div className="checkbox">
						<input type="checkbox" id={'check'}/>
						<label htmlFor='check'>
							<CheckIcon/>
						</label>
					</div>
					<input type="text" value={'ReactJS learn'}/>
					{/*//<p>ReactJS learn</p>*/}
				</li>
			</ul>
			
		</div>
	);
}

export default Tasks