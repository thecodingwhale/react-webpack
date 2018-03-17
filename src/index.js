import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import Tasks from './containers/Tasks';
import Page404 from './components/Page404';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/tasks' component={Tasks}/>
      <Route path="*" component={Page404}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
