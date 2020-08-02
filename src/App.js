import React from 'react';
import List from "./components/List/List";
import ListIcon from "./components/Icons/ListIcon";
import AddIcon from "./components/Icons/AddIcon";

/**TODO: add gh-page **/
/**TODO: add page 404 **/

function App() {
  return (
    <main className={'todo'}>
	    <aside className="sidebar">
		    <List 
			    items={[
				    {
				      icon: <ListIcon/>,
					    name: "All tasks"
				    }
			    ]}
		    />
		    
		    <List 
			    items={[
			      {
				      color: 'tomato',
				      name: 'Shopping'
				    },
				    {
					    color: '#c7c7c7',
					    name: 'Work',
					    active: true
				    }
			    ]}
		      isRemovable
		    />

		    <List
			    items={[
				    {
				    	modificator: '__add',
					    icon: <AddIcon/>,
					    name: 'Add list'
				    },
			    ]}
			    isRemovable
		    />
	    </aside>
	    <div className="tasks">
		    Hello. I'm tasks
	    </div>
    </main>
  );
}

export default App;
