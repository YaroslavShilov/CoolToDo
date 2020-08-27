import React, {useEffect, useState} from 'react';
import Tasks from "./components/Tasks/Tasks";
import Sidebar from "./components/Sidebar";
import axios from 'axios';
import {Route, useHistory, useLocation} from "react-router-dom";
import {defaultDB} from "./components/defaultDB";

/**TODO: add gh-page **/
/**TODO: add page 404 **/
/**TODO: add delete button AddList if list too long **/
/**TODO: add loader**/
/**TODO: add default database**/
/**TODO: add firebase**/

const URL = "https://cooltodo-f7d10.firebaseio.com";
function App() {
	let history = useHistory();
	let location = useLocation();

	const [lists, setLists] = useState(null);
	const [colors, setColors] = useState(null);
	const [activeList, setActiveList] = useState(null)


	const onDefaultDB = () => {
		axios.get(`${URL}/history.json`).then(({data}) => {
			console.log(data)
		})
	}

	useEffect(() => {
		axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
			setLists(data.map(list => ({...list, color: list.color.hex})));
		})

		axios.get('http://localhost:3001/colors').then(({data}) => {
			setColors(data);
		})
	}, [])



	//BEGIN List handlers
	const onAddList = (title, colorId, finished) => {
		axios
			.post('http://localhost:3001/lists', {
				name: title,
				colorId: colorId,
				tasks: []
			})
			.then(({data}) => {
				const newList = {
					...data,
					color: colors.find(color => color.id === colorId).hex
				}
				setLists([...lists, newList])
				history.push(`/lists/${newList.id}`);
			})
			.finally( () => {
				finished()
			})
	}

	const onClickList = (list, modif ) => {
		if(modif === 'all') history.push('/')
		else history.push(`/lists/${list.id}`);
	}

	const onRemoveList = (id) => {
		setLists(lists.filter(item => item.id !== id))
		history.push('/')
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

	const onEditTask = (listId, taskId, value) => {
		const newList = lists.map(list => {
			if(list.id === listId) {
				list.tasks.find(task => task.id === taskId).text = value;
			}
			return list
		})
		setLists(newList)

		axios.patch(`http://localhost:3001/tasks/${taskId}`, {
			text: value
		}).catch(() => {
			alert('something is wrong. I cannot change the text of task')
		})
	}

	const onCheckTask = (listId, taskId, completed) => {
		const newList = lists.map(list => {
			if(list.id === listId) {
				list.tasks.find(task => task.id === taskId).completed = completed;
			}
			return list
		})
		setLists(newList);

		axios.patch(`http://localhost:3001/tasks/${taskId}`, {
			completed
		}).catch(() => {
			alert('something is wrong. I cannot tick the task')
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
			<button onClick={onDefaultDB}>Click here for test</button>
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
								onRemoveTask={onRemoveTask}
								onEditTask={onEditTask}
								onCheckTask={onCheckTask}
								withoutEmpty
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
							onEditTask={onEditTask}
							onCheckTask={onCheckTask}
						/>
					}
				</Route>
			</div>
		</main>
	);
}

export default App;
