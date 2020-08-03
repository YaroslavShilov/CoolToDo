import React from 'react';
import AddList from "./components/AddList/AddList";
import TasksFolders from "./components/TasksFolders";

/**TODO: add gh-page **/
/**TODO: add page 404 **/

function App() {
	
  return (
    <main className={'todo'}>
	    <aside className="sidebar">
		    <TasksFolders/>
		    <AddList/>
	    </aside>
	    <div className="tasks">
		    Hello. I'm tasks
	    </div>
    </main>
  );
}

export default App;
