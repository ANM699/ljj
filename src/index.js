import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home';
import Main from './containers/Main';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route component={Main} />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
