import React, {useEffect, useState} from 'react';
import CheckIcon from "../Icons/CheckIcon";
import EditIcon from "../Icons/EditIcon";
import RemoveIcon from "../Icons/RemoveIcon";
import TrashIcon from "../Icons/TrashIcon";

export const Task = ({id, text, completed, onRemoveTask, onEditTask, onCheckTask}) => {
	const [isRemove, setIsRemove] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [value, setValue] = useState(text)
	const [checkIconClass, setCheckIconClass] = useState('')

	const onChangeHandler = (e) => setValue(e.target.value)
	const onRemoveHandler = () => setIsRemove(!isRemove)
	const onEditHandler = () => setIsEdit(!isEdit)



	const agreeHandler = () => {
		if(isEdit) {
			if(value.trim() !== text) {
				onEditTask(value.trim())
			}
			setIsEdit(false);
		}
		if(isRemove) onRemoveTask();
	}
	const refuseHandler = () => {
		setIsEdit(false);
		setIsRemove(false);
		setValue(text);
	}

	useEffect(() => {
		if(isRemove) setCheckIconClass('remove')
		if(isEdit) setCheckIconClass('edit')
	}, [isRemove, isEdit])

	return (
		<li className={isRemove || isEdit ? 'active' : null}>
			<div className="checkbox">
				<input
					type="checkbox"
					id={`task-${id}`}

					checked={completed}
					onChange={onCheckTask}
				/>
				<label htmlFor={`task-${id}`}>
					<CheckIcon/>
				</label>
			</div>

			<input
				type="text"
				value={value}
				readOnly={!isEdit}
				onChange={onChangeHandler}
			/>

			<div className="tasks__actions">

				{isRemove || isEdit
					? <>
							{value.trim().length
								? <div onClick={agreeHandler} className={checkIconClass}><CheckIcon/></div>
								: null
							}
							<div onClick={refuseHandler}><RemoveIcon/></div>
						</>
					: <>
							<div onClick={onEditHandler}><EditIcon/></div>
							<div onClick={onRemoveHandler}><TrashIcon/></div>
						</>
				}

			</div>

		</li>
	);
}

