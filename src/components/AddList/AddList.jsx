import React, {useState} from 'react';

import './AddList.scss'

import Badge from "../Badge/Badge";
import CloseIcon from "../Icons/CloseIcon";
import {randomId} from "../../utils";
import AddIcon from "../Icons/AddIcon";
import List from "../List/List";

const AddList = ({colors, onAddList, maxListsSize, currentListsSize}) => {


	
	const [visiblePopup, setVisiblePopup] = useState(false)
	const [selectedColor, selectColor] = useState(colors[0].id);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	if(currentListsSize > maxListsSize) return null
	
	const showPopup = () => setVisiblePopup(true)
	const hidePopup = () => {
		setVisiblePopup(false)
		setInputValue('')
		selectColor(colors[0].id)
		setIsLoading(false)
	}
	const inputChangeHandler = e => setInputValue(e.target.value);

	const addList = () => {
		setIsLoading(true)

		onAddList(inputValue.trim(), selectedColor, hidePopup)


	}
	
	return (
		<div className={'add-list'}>
			<List
				onClickList={showPopup}
				items={[
					{
						modificator: '__add',
						icon: <AddIcon/>,
						name: 'Add list',
						id: randomId()
					},
				]}
			/>

			{visiblePopup &&
				<div className="add-list__popup">
	
					<div className="add-list__close" onClick={hidePopup}>
						<CloseIcon/>
					</div>
	
					<input
						className={'field'}
						type="text"
						placeholder={'Name of list'}
						value={inputValue}
						onChange={inputChangeHandler}
					/>
					
					<ul className="add-list__colors">
						{colors.map(
							color => (
								<li
									key={color.id}
									onClick={() => selectColor(color.id)}
									className={color.id === selectedColor ? 'active' : ''}
								>
									<Badge color={color.color}/>
								</li>
							))
						}
					</ul>
					<button 
						className={'button'} 
						onClick={addList}
						disabled={!inputValue || isLoading}
					>
						{isLoading ? 'Loading...' : 'Add'}
					</button>
				</div>
			}

		</div>
	)
}

export default AddList