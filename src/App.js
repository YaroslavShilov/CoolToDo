import React, {useEffect, useState} from 'react';
import Tasks from "./components/Tasks/Tasks";
import Sidebar from "./components/Sidebar";
import axios from 'axios';

/**TODO: add gh-page **/
/**TODO: add page 404 **/
/**TODO: add delete button AddList if list too long **/
/**TODO: add color of title **/
/**TODO: add loader**/



function App() {
	
	const [lists, setLists] = useState(null);
	const [colors, setColors] = useState(null);
	const [activeItem, setActiveItem] = useState(null)

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
			if(item.id === listId) item.tasks = [...item.tasks, taskObj];
			return item
		})
		setLists(newList)
	}
	
	const onRemove = (id) => {
		setLists(lists.filter(item => item.id !== id))
	}
	
	const onClickItem = (item) => {
		setActiveItem(item)
	}
	
	const onEditTitle = (id,title) => {
		const newList = lists.map(list => {
			if(list.id === id) list.name = title;
			return list
		})
		setLists(newList)
	}
	
	
	
  return (
    <main className={'todo'}>
	    
	    {lists && colors
	      ? <Sidebar 
			      lists={lists} 
			      colors={colors} 
			      onAddList={onAddList}
			      onRemove={onRemove}
			      onClickItem={onClickItem}
			      activeItem={activeItem}
		      />
		    : 'Loading...'
	    }

	    {lists && activeItem && 
		    <Tasks 
			    list={activeItem} 
			    onEditTitle={onEditTitle}
			    onAddTask={onAddTask}
		    />
	    }
	    
    </main>
  );
}

export default App;
