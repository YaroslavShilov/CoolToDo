import React, {useEffect, useState} from 'react';
import Tasks from "./components/Tasks/Tasks";
import Sidebar from "./components/Sidebar";
import axios from 'axios';

/**TODO: add gh-page **/
/**TODO: add page 404 **/
/**TODO: add delete button AddList if list too long **/



function App() {
	
	const [lists, setLists] = useState(null);
	const [colors, setColors] = useState(null);

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
	
	const onRemove = (id) => {
		setLists(lists.filter(item => item.id !== id))
	}
	
  return (
    <main className={'todo'}>

	    {lists && colors
	      ? <Sidebar 
			      lists={lists} 
			      colors={colors} 
			      onAddList={onAddList}
			      onRemove={onRemove}
		      />
		    : 'Loading...'
	    }

	    {lists && <Tasks />}
	    
    </main>
  );
}

export default App;
