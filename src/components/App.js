import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Tasks from './Tasks';
import Page404 from './Page404';

const App = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/tasks' component={Tasks}/>
    <Route path="*" component={Page404}/>
  </Switch>
);

export default App;
