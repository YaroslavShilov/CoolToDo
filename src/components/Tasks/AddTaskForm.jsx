import React, {useState} from 'react';
import AddIcon from "../Icons/AddIcon";

export const AddTaskForm = ({list, onAddTask}) => {
	
	const [visibleForm, setVisibleForm] = useState(false)
	const [inputValue, setInputValue] = useState('')
	
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
			'text': inputValue,
			'completed': false
		}
		onAddTask(list.id, task)
		toggleFormVisible()
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
							disabled={!inputValue}
						>
							{/*{isLoading ? 'Loading...' : 'Add'}*/}
							Add
						</button>
						<button
							className={'button __grey'}
							//disabled={!inputValue || isLoading}
							onClick={toggleFormVisible}
						>
							{/*{isLoading ? 'Loading...' : 'Cancel'}*/}
							Cancel
						</button>
					</div>			
			}
		</div>
	);
}
