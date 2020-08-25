import React, {useEffect, useState} from 'react';
import Tasks from "./components/Tasks/Tasks";
import Sidebar from "./components/Sidebar";
import axios from 'axios';
import {Route, useHistory, useLocation} from "react-router-dom";

/**TODO: add gh-page **/
/**TODO: add page 404 **/
/**TODO: add delete button AddList if list too long **/

/**TODO: add color of title **/
/**TODO: add loader**/

function App() {
	let history = useHistory();
	let location = useLocation();

	const [lists, setLists] = useState(null);
	const [colors, setColors] = useState(null);
	const [activeList, setActiveList] = useState(null)

	useEffect(() => {
		axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
			setLists(data.map(list => ({...list, color: list.color.hex})));
		})

		axios.get('http://localhost:3001/colors').then(({data}) => {
			setColors(data);
		})
	}, [])

	const onAddList = (obj) => {
		setLists([...lists, obj])
	}

	const onAddTask = (listId, taskObj) => {
		const newList = lists.map(item => {
			if (item.id === listId) item.tasks = [...item.tasks, taskObj];
			return item
		})
		setLists(newList)
	}

	const onRemove = (id) => {
		setLists(lists.filter(item => item.id !== id))
	}

	const onEditTitle = (id, title) => {
		const newList = lists.map(list => {
			if (list.id === id) list.name = title;
			return list
		})
		setLists(newList)
	}

	const onClickList = (list, modif ) => {
		if(modif === 'all') history.push('/')
		else history.push(`/lists/${list.id}`);
	}



	useEffect(() => {
		if(location.pathname === '/') {
			return setActiveList(null)
		}
		const listId = location.pathname.split('/lists/')[1];
		if (lists) {
			const list = lists.find(list => list.id === Number(listId));
			setActiveList(list)
		}

	}, [location.pathname, lists])

	return (
		<main className={'todo'}>
			{lists && colors
				? <Sidebar
					lists={lists}
					colors={colors}
					onAddList={onAddList}
					onRemove={onRemove}
					activeList={activeList}
					onClickList={onClickList}
				/>
				: 'Loading...'
			}
			<div className="todo__tasks">
				<Route path={'/'} exact>
					{
						lists && lists.map(list =>
							<Tasks
								key={list.id}
								list={list}
								onEditTitle={onEditTitle}
								onAddTask={onAddTask}
								withoutEmpty
							/>
						)
					}
				</Route>

				<Route path={'/lists/:id'}>

					{lists && activeList &&
						<Tasks
							list={activeList}
							onEditTitle={onEditTitle}
							onAddTask={onAddTask}
						/>
					}
				</Route>
			</div>
		</main>
	);
}

export default App;
