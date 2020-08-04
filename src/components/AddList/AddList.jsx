import React, {useState} from 'react';
import AddIcon from "../Icons/AddIcon";
import List from "../List/List";

import './AddList.scss'
import Badge from "../Badge/Badge";
import CloseIcon from "../Icons/CloseIcon";

const AddList = ({colors}) => {
	const [visiblePopup, setVisiblePopup] = useState(false)
	const [selectedColor, selectColor] = useState(colors[0].id);

	const showPopup = () => setVisiblePopup(true)
	const hidePopup = () => setVisiblePopup(false)

	return (
		<div className={'add-list'}>
			<List
				onClick={showPopup}
				items={[
					{
						modificator: '__add',
						icon: <AddIcon/>,
						name: 'Add list'
					},
				]}
				isRemovable
			/>

			{visiblePopup &&
				<div className="add-list__popup">
	
					<div 
						className="add-list__close"
						onClick={hidePopup}
					>
						<CloseIcon/>
					</div>
	
					<input
						className={'field'}
						type="text"
						placeholder={'Name of list'}
					/>
					<ul className="add-list__colors">
						{colors.map(item => (
							<li
								key={item.id}
								onClick={() => selectColor(item.id)}
								className={item.id === selectedColor ? 'active' : ''}
							>
								<Badge color={item.hex}/>
							</li>
						))}
					</ul>
					<button className={'button'}>Add</button>
				</div>
			}

		</div>
	)
}

export default AddList