import React, {useState} from 'react';
import CheckIcon from "../Icons/CheckIcon";
import EditIcon from "../Icons/EditIcon";
import RemoveIcon from "../Icons/RemoveIcon";
import TrashIcon from "../Icons/TrashIcon";

export const Task = ({id, text, completed, onRemoveTask, onEditTask}) => {
	const [isRemove, setIsRemove] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [value, setValue] = useState(text)

	const onChangeHandler = (e) => setValue(e.target.value)
	const onRemoveHandler = () => setIsRemove(!isRemove)
	const onEditHandler = () => setIsEdit(!isEdit)


	const agreeHandler = () => {
		if(isEdit) onEditTask(value);
		if(isRemove) onRemoveTask();
	}
	const refuseHandler = () => {
		setIsEdit(false);
		setIsRemove(false);
	}

	const checkIconModif = () => {
		if(isRemove) return 'remove'
		if(isEdit) return 'edit'
	}


	return (
		<li className={isRemove || isEdit ? 'active' : null}>
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
				value={value}
				readOnly={!isEdit}
				onChange={onChangeHandler}
			/>

			<div className="tasks__actions">
				{isRemove || isEdit
					? <>
							<div
								onClick={agreeHandler}
								className={checkIconModif()}
							><CheckIcon/></div>
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
