import React from 'react';
import axios from 'axios';

import './Tasks.scss';

import EditIcon from "../Icons/EditIcon";
import CheckIcon from "../Icons/CheckIcon";
import {AddTaskForm} from "./AddTaskForm";


const Tasks = ({list, onEditTitle, onAddTask}) => {
	
	const editTitle = () => {
		const newTitle = window.prompt('Write a new name', list.name)
		if(newTitle) {
			onEditTitle(list.id, newTitle)
			axios.patch('http://localhost:3001/lists/' + list.id, {
				name: newTitle
			}).catch(() => {
				alert('something is wrong. I cannot change the name of list')
			})
		}
	}
	
	return (
		<div className="tasks">
			<h2 className={'tasks__title'}>
				{list.name}
				<span className="tasks__title-icon" onClick={editTitle}>
					<EditIcon/>
				</span>
			</h2>
			
			{!list.tasks.length && <h3 className={'tasks__empty'}>There aren't any tasks</h3>}
			
			<ul className="tasks__items">
				
				{
					list.tasks.map(({id, text, completed}) => {
						return (
							<li key={id}>
								<div className="checkbox">
									<input 
										type="checkbox" 
										id={`task-${id}`} 
										checked={completed}
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
						)
					})
				}
				
			</ul>

			<AddTaskForm list={list} onAddTask={onAddTask}/>
			
		</div>
	);
}

export default Tasks