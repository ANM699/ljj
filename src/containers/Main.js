import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Container from '../components/Container';
import Column from './Column';
import Wall from './Wall';
import Beam from './Beam';
import Floor from './Floor';
import Records from './Records';

export default function Main() {
  const project = JSON.parse(sessionStorage.getItem('curProject'));
  const template = JSON.parse(sessionStorage.getItem('curTemplate'));
  if (!(project && template)) {
    return <Redirect to="/" />;
  }
  return (
    <Container navBar={project.name} header={template.name}>
      <Switch>
        <Route path="/records" component={Records} />
        <Route path="/columns" exact={true} component={Column} />
        <Route path="/columns/:id" component={Column} />
        <Route path="/walls" exact={true} component={Wall} />
        <Route path="/walls/:id" component={Wall} />
        <Route path="/beams" exact={true} component={Beam} />
        <Route path="/beams/:id" component={Beam} />
        <Route path="/floors" exact={true} component={Floor} />
        <Route path="/floors/:id" component={Floor} />
      </Switch>
    </Container>
  );
}
