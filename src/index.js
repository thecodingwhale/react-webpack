import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import { reducer } from "./redux";
import watcherSaga from "./sagas";

import Home from './containers/Home';
import Tasks from './containers/Tasks';
import Page404 from './components/Page404';

import 'sanitize.css/sanitize.css';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

// create a redux store with our reducer above and middleware
let store = createStore(
  reducer,
  composeSetup(applyMiddleware(sagaMiddleware))
);

// run the saga
sagaMiddleware.run(watcherSaga);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/tasks' component={Tasks}/>
        <Route path="*" component={Page404}/>
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
