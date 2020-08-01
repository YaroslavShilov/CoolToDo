import React from 'react';
import List from "./components/List";

/**TODO: add gh-page **/
/**TODO: add page 404 **/

function App() {
  return (
    <main className={'todo'}>
	    <aside className="sidebar">
		    <List/>
	    </aside>
	    <div className="tasks">
		    Hello. I'm tasks
	    </div>
    </main>
  );
}

export default App;
