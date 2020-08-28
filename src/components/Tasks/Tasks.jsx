import React from 'react';

import './Tasks.scss';

import EditIcon from "../Icons/EditIcon";
import {AddTaskForm} from "./AddTaskForm";
import {Task} from "./Task";


const Tasks = ({list, onEditListTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCheckTask}) => {

	const editTitle = () => {
		const newTitle = window.prompt('Write a new name', list.name)
		if(newTitle) {
			onEditListTitle(list.id, newTitle)
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
						<Task
							key={id}
							id={id}
							text={text}
							completed={completed}
							onRemoveTask={() => onRemoveTask(list.id, id)}
							onEditTask={(value) => onEditTask(list.id, id, value)}
							onCheckTask={() => onCheckTask(list.id, id, !completed)}
						/>
					)
				}
				
			</ul>

			<AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
			
		</div>
	);
}

export default Tasks