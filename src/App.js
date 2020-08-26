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



	//BEGIN List handlers
	const onAddList = (obj) => {
		setLists([...lists, obj])
	}

	const onClickList = (list, modif ) => {
		if(modif === 'all') history.push('/')
		else history.push(`/lists/${list.id}`);
	}

	const onRemoveList = (id) => {
		setLists(lists.filter(item => item.id !== id))
	}

	const onEditListTitle = (id, title) => {
		const newList = lists.map(list => {
			if (list.id === id) list.name = title;
			return list
		})
		setLists(newList)
	}
	//END List handlers



	//BEGIN Task handlers
	const onAddTask = (listId, taskObj) => {
		const newList = lists.map(item => {
			if (item.id === listId) item.tasks = [...item.tasks, taskObj];
			return item
		})
		setLists(newList)
	}

	const onRemoveTask = (listId, taskId) => {
		const newList = lists.map(list => {
			if(list.id ===  listId) {
				list.tasks = list.tasks.filter(task => task.id !== taskId);
			}
			return list
		})

		setLists(newList);

		axios.delete('http://localhost:3001/tasks/' + taskId).catch(() => {
			alert('something is wrong. I cannot delete this task')
		})
	}
	//END Task handlers


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
					onRemoveList={onRemoveList}
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
								onEditListTitle={onEditListTitle}
								onAddTask={onAddTask}
								withoutEmpty
								onRemoveTask={onRemoveTask}
							/>
						)
					}
				</Route>

				<Route path={'/lists/:id'}>

					{lists && activeList &&
						<Tasks
							list={activeList}
							onEditListTitle={onEditListTitle}
							onAddTask={onAddTask}
							onRemoveTask={onRemoveTask}
						/>
					}
				</Route>
			</div>
		</main>
	);
}

export default App;
