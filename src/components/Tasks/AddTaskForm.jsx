import React, {useState} from 'react';
import axios from 'axios';
import AddIcon from "../Icons/AddIcon";

export const AddTaskForm = ({list, onAddTask}) => {
	
	const [visibleForm, setVisibleForm] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	
	const toggleFormVisible = () => {
		setVisibleForm(!visibleForm);
		setInputValue('')
	}
	
	const onChangeHandler = (e) => {
		setInputValue(e.target.value);
	}
	
	const addTask = () => {
		const task = {
			'listId': list.id,
			'text': inputValue.trim(),
			'completed': false
		}
		setIsLoading(true);
		
		axios.post('http://localhost:3001/tasks', task).then(({data}) => {
			onAddTask(list.id, data)
			toggleFormVisible()

		})
		.catch(() => {
			alert('Sorry, We weren\'t able to add this task')
		})
		.finally(() => {
			setIsLoading(false);
		})
		
		
	}
	
	
	return (
		<div className="tasks__form">
			
			{!visibleForm
				? <div className="tasks__form-new" onClick={toggleFormVisible}>
						<AddIcon/>
						<p>New Task</p>
					</div>
				: <div className="tasks__form-block">
						<input
							className={'field'}
							type="text"
							value={inputValue}
							placeholder={'Task...'}
							onChange={onChangeHandler}
						/>
						<button
							className={'button'}
							onClick={addTask}
							disabled={!inputValue || isLoading}
						>
							{isLoading ? 'Loading...' : 'Add'}
						</button>
						{!isLoading &&
							<button
								className={'button __grey'}
								disabled={isLoading}
								onClick={toggleFormVisible}
							>
								Cancel
							</button>
						}
						
					</div>			
			}
		</div>
	);
}
