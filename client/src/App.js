import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

// Components

import Colors from './components/Colors/Colors';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import User from './components/User/User';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import * as actions from './store/actions/index';
import Toolbar from './components/Toolbar/Toolbar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

  const expireTime = useSelector(state => state.auth.expire)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.verifyAuth())
  }, [dispatch])

  if(expireTime) {
    setTimeout(() => {
      dispatch(actions.logout());
    }, expireTime);
  }

  return (
    <Fragment>
      <Router>
        <Toolbar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" exact render={props => (
            <DndProvider backend={HTML5Backend}>
              <Colors {...props} />
            </DndProvider>
          )} />
          <Route path="/user" component={User} />  
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
