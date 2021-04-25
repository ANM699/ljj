import React, { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import Main from './containers/Main';
import EasterEgg from './components/EasterEgg';
import EasterEggContext from './context';

export default function App() {
  const [easterEgg, setEasterEgg] = useState(false);
  return (
    <EasterEggContext.Provider value={{ easterEgg, setEasterEgg }}>
      <HashRouter>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route component={Main} />
        </Switch>
      </HashRouter>
      <EasterEgg></EasterEgg>
    </EasterEggContext.Provider>
  );
}
