import React from 'react';
import axios from 'axios';

import './Tasks.scss';

import EditIcon from "../Icons/EditIcon";
import {AddTaskForm} from "./AddTaskForm";
import {Task} from "./Task";


const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty}) => {
	
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
			<h2 className={'tasks__title'} style={{color: list.color}}>
				{list.name}
				<span className="tasks__title-icon" onClick={editTitle}>
					<EditIcon/>
				</span>
			</h2>
			
			{!list.tasks.length && !withoutEmpty && <h3 className={'tasks__empty'}>There aren't any tasks</h3>}
			
			<ul className="tasks__items">
				
				{
					list.tasks.map(({id, text, completed}) =>
						<Task key={id} id={id} text={text} completed={completed}/>
					)
				}
				
			</ul>

			<AddTaskForm list={list} onAddTask={onAddTask}/>
			
		</div>
	);
}

export default Tasks