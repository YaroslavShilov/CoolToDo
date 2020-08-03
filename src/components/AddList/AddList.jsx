import React, {useState} from 'react';
import AddIcon from "../Icons/AddIcon";
import List from "../List/List";

import './AddList.scss'

const AddList = () => {
	const [visiblePopup, setVisiblePopup] = useState(false)
	
	const showPopup = () => {
		setVisiblePopup(true)
	}
	const hidePopup = () => {
		setVisiblePopup(false)
	}
	
	return (
		<div className={'add-list'}>
			<List
				items={[
					{
						modificator: '__add',
						icon: <AddIcon/>,
						name: 'Add list'
					},
				]}
				isRemovable
				onClick={showPopup}
			/>
			
			{visiblePopup &&
				<div className="add-list__popup">
					<h2>123</h2>
				</div>
			}
			
		</div>
	)
}

export default AddList