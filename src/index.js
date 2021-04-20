import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Record from './containers/Record';
import Main from './containers/Main';
import DBContext from './context';
import { HashRouter, Switch, Route } from 'react-router-dom';

function App() {
  const [db, setDb] = useState(null);
  useEffect(() => {
    let db = null;
    let request = window.indexedDB.open('ljjDB');
    request.onupgradeneeded = function (event) {
      db = event.target.result;
      if (!db.objectStoreNames.contains('projects')) {
        db.createObjectStore('projects', { autoIncrement: true });
      }
    };
    request.onsuccess = function (event) {
      db = event.target.result;
      setDb(db);
    };
  }, []);
  return (
    <DBContext.Provider value={db}>
      <HashRouter>
        <Switch>
          <Route path="/record" component={Record} />
          <Route component={Main} />
        </Switch>
      </HashRouter>
    </DBContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
