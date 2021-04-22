import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Container from '../components/Container';
import Edit from './record/Edit';
import List from './record/List';

export default function Main() {
  const project = JSON.parse(sessionStorage.getItem('curProject'));
  const template = JSON.parse(sessionStorage.getItem('curTemplate'));
  if (!(project && template)) {
    return <Redirect to="/" />;
  }
  return (
    <Container navBar={project.name} header={template.name}>
      <Switch>
        <Route path="/record" component={List} />
        <Route path="/edit" exact={true} component={Edit} />
        <Route path="/edit/:id" component={Edit} />
      </Switch>
    </Container>
  );
}
