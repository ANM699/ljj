import React from 'react';
import ReactDOM from 'react-dom';
import Record from './containers/record/Record';
import Add from './containers/record/Add';
import List from './containers/record/List';
import Main from './containers/Main';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/record/Add" component={Add} />
      <Route path="/record/List" component={List} />
      <Route path="/record" component={Record} />
      <Route component={Main} />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
