import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.css';

// Components

import Colors from './components/Colors/Colors';
import Layout from './hoc/Layout/Layout';
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

function App() {

  const isAuthenticated = useSelector(state => state.auth.isAuth)

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
        <Layout>

          <Switch>

          <Route 
              exact
              path="/color"
              render={
                props => isAuthenticated ? (
                  <DndProvider backend={HTML5Backend}>
                    <Colors {...props} />
                  </DndProvider>
                ) : (
                  <Redirect to="/login" />
                ) } />

            <Route 
              exact
              path="/user"
              render={
                props => isAuthenticated ? (
                  <User {...props} />
                ) : (
                  <Redirect to="/login" />
                ) } />  

            <Route 
              exact
              path="/login"
              render={props => 
                !isAuthenticated ? (
                  <Login {...props} />
                ) : (
                  <Redirect to="/color" />
                ) } />

            <Route
              exact
              path="/register"
              render={props => 
                !isAuthenticated ? (
                  <Register {...props} />
                ) : (
                  <Redirect to="/login" />
                ) } />

            { !isAuthenticated && <Redirect to="/login" from="/" /> }

          </Switch>
        </Layout>
      </Router>
    </Fragment>
  );
}

export default App;
