import React, {useEffect, useState} from 'react';
import Tasks from "./components/Tasks/Tasks";
import Sidebar from "./components/Sidebar";
//import axios from './axios/axios';
import {Route, useHistory, useLocation} from "react-router-dom";
import {defaultDB} from "./defaultDB";

const postDefaultDB = async (history) => {
	await localStorage.setItem('lists', JSON.stringify(defaultDB["lists"]));
	await localStorage.setItem('tasks', JSON.stringify(defaultDB["tasks"]));
	await localStorage.setItem('colors', JSON.stringify(defaultDB["colors"]));
	history.push(`/`);
	window.location.reload(false)
}

const getDataBase = async (history) => {
	const dataLists = await JSON.parse(localStorage.getItem('lists')) || defaultDB["lists"]
	const dataTasks = await JSON.parse(localStorage.getItem('tasks')) || defaultDB["tasks"]
	const dataColors = await JSON.parse(localStorage.getItem('colors')) || defaultDB["colors"]

	const lists = dataLists.map((list) => {
		const tasks = dataTasks.filter((task) => task.listId === list.id);
		const color = dataColors.find((color) => color.id === list.colorId).color;
		return {...list, tasks, color}
	})

	return {lists, colors: dataColors, tasks: dataTasks};
}


function App() {
	let history = useHistory();
	let location = useLocation();

	const [lists, setLists] = useState(null);
	const [colors, setColors] = useState(null);
	const [tasks, setTasks] = useState(null)
	const [activeList, setActiveList] = useState(null)

	useEffect(() => {
		getDataBase().then(({lists, colors, tasks}) => {
			setLists(lists);
			setColors(colors);
			setTasks(tasks)
		})
	}, [])

	//BEGIN List handlers
	const onAddList = (title, colorId, finished) => {
		const id = lists.length + 1;
		const newLists = [
			...lists,
			{
				id,
				name: title,
				colorId: colorId,
				tasks: [],
				color: colors.find(color => color.id === colorId).color,
			},
		];

		(async function() {
			await localStorage.setItem('lists', JSON.stringify(newLists));
			setLists(newLists);
			history.push(`/lists/${id}`);
			finished()
		}())
	}

	const onClickList = (list, modif ) => {
		if(modif === 'all') history.push('/')
		else history.push(`/lists/${list.id}`);
	}

	const onRemoveList = (id) => {
		if(window.confirm('Do you really want to delete this list?')) {
			const newLists = lists.filter(item => item.id !== id)

			try {
				localStorage.setItem('lists', JSON.stringify(newLists));

				setLists(newLists)
				history.push('/')
			} catch {
				alert('Something is wrong. I can\'t delete this list')
			}

		}

	}

	const onEditListTitle = (listId, title) => {
		const newList = lists.map(list => {
			if (list.id === listId) list.name = title;
			return list
		})
		setLists(newList)

		try {
			localStorage.setItem('lists', JSON.stringify(lists))
		} catch {
			alert('something is wrong. I cannot change the name of list')
		}
	}
	//END List handlers



	//BEGIN Task handlers
	const onAddTask = (listId, text, then, finished) => {

		const id = tasks.length + 1;
		const newTask = {
			id,
			listId,
			text,
			'completed': false
		}

		const newList = lists.map(list => {
			if (list.id === listId) list.tasks = [...list.tasks, newTask];
			return list
		})
		const newTasks = [...tasks, newTask]

		setTasks(newTasks)
		setLists(newList);

		(async function() {
			try {
				await localStorage.setItem('tasks', JSON.stringify(newTasks))
				then();
			} catch {
				alert('Sorry, We weren\'t able to add this task')
			}
			finished()
		}());
	}

	const onRemoveTask = (listId, taskId) => {
		const newLists = lists.map(list => {
			if(list.id ===  listId) {
				list.tasks = list.tasks.filter(task => task.id !== taskId);
			}
			return list
		})

		const newTasks = tasks.filter(task => task.id !== taskId)

		setTasks(newTasks)
		setLists(newLists);

		try {
			localStorage.setItem('tasks', JSON.stringify(newTasks))
		} catch {
			alert('something is wrong. I cannot delete this task')
		}
	}

	const onEditTask = (listId, taskId, value) => {
		const newLists = lists.map(list => {
			if(list.id === listId) {
				list.tasks.find(task => task.id === taskId).text = value;
			}
			return list
		})
		const newTasks = [...tasks, tasks.find(task => task.id === taskId).text = value]

		setTasks(newTasks)
		setLists(newLists)


		try {
			localStorage.setItem('tasks', JSON.stringify(newTasks));
		} catch {
			alert('something is wrong. I cannot change the text of task')
		}
	}

	const onCheckTask = (listId, taskId, completed) => {
		const newLists = lists.map(list => {
			if(list.id === listId) {
				list.tasks.find(task => task.id === taskId).completed = completed;
			}
			return list
		})
		const newTasks = [...tasks, tasks.find(task => task.id === taskId).completed = completed]

		setTasks(newTasks);
		setLists(newLists);

		try {
			localStorage.setItem('tasks', JSON.stringify(newTasks));
		} catch {
			alert('something is wrong. I cannot tick the task')
		}
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
			<button className={'defaultDB'} onClick={() => postDefaultDB(history)}>
				Default DB
			</button>
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
