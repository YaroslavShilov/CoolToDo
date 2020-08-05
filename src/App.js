import React, {useState} from 'react';
import Tasks from "./components/Tasks/Tasks";
import Sidebar from "./components/Sidebar";

const DB = {
	"lists": [
		{
			"id": 1,
			"name": "Shopping",
			"colorId": 5
		},
		{
			"id": 2,
			"name": "FrontEnd",
			"colorId": 4
		},
		{
			"id": 3,
			"name": "Movies",
			"colorId": 3
		},
		{
			"id": 4,
			"name": "Books",
			"colorId": 2
		},
		{
			"id": 5,
			"name": "Personal",
			"colorId": 1
		},
		{
			"name": "Sport",
			"colorId": 3,
			"id": 6
		},
	],
	"tasks": [
		{
			"id": 1,
			"listId": 2,
			"text": "Learn JavaScript",
			"completed": true
		},
		{
			"id": 2,
			"listId": 2,
			"text": "Learn Patterns",
			"completed": false
		},
		{
			"id": 3,
			"listId": 2,
			"text": "ReactJS Hooks (more deep)",
			"completed": true
		},
		{
			"id": 4,
			"listId": 2,
			"text": "Redux (redux-observable, redux-saga)",
			"completed": false
		},
		{
			"listId": 2,
			"text": "123",
			"completed": true,
			"id": 5
		},
		{
			"listId": 1,
			"text": "test",
			"completed": false,
			"id": 6
		},
		{
			"listId": 1,
			"text": "qweqwe",
			"completed": false,
			"id": 7
		},
		{
			"listId": 1,
			"text": "qweqwe",
			"completed": true,
			"id": 8
		},
		{
			"listId": 1,
			"text": "123",
			"completed": false,
			"id": 9
		},
		{
			"listId": 4,
			"text": "buy 1984!",
			"completed": true,
			"id": 10
		},
		{
			"listId": 2,
			"text": "222",
			"completed": true,
			"id": 12
		},
		{
			"listId": 7,
			"text": "Sidebar is done",
			"completed": true,
			"id": 15
		},
		{
			"listId": 7,
			"text": "List is done",
			"completed": true,
			"id": 16
		},
		{
			"listId": 7,
			"text": "Delete is don",
			"completed": true,
			"id": 17
		},
		{
			"listId": 8,
			"text": "tttt",
			"completed": false,
			"id": 18
		}
	],
	"colors": [
		{
			"id": 1,
			"hex": "#C9D1D3",
			"name": "grey"
		},
		{
			"id": 2,
			"hex": "#42B883",
			"name": "green"
		},
		{
			"id": 3,
			"hex": "#64C4ED",
			"name": "blue"
		},
		{
			"id": 4,
			"hex": "#FFBBCC",
			"name": "pink"
		},
		{
			"id": 5,
			"hex": "#B6E6BD",
			"name": "lime"
		},
		{
			"id": 6,
			"hex": "#C355F5",
			"name": "purple"
		},
		{
			"id": 7,
			"hex": "#110133",
			"name": "black"
		},
		{
			"id": 8,
			"hex": "#FF6464",
			"name": "red"
		}
	]
}

/**TODO: add gh-page **/
/**TODO: add page 404 **/
/**TODO: add delete button AddList if list too long **/

function App() {
	const [lists, setLists] = useState(DB.lists.map(item => {
		item.color = DB.colors.find(color => color.id === item.colorId).hex;
		return item;
	}))
	
	const onAddList = (obj) => {
		setLists([...lists, obj])
	}
	
  return (
    <main className={'todo'}>
	    <Sidebar lists={lists} colors={DB.colors} onAddList={onAddList}/>
	    
	    <Tasks />
    </main>
  );
}

export default App;
