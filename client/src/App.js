import React, { Fragment } from 'react';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Components

import Colors from './components/Colors/Colors';
import Layout from './hoc/Layout/Layout';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { useEffect } from 'react';

import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import { useSelector, useDispatch } from 'react-redux';
import Logout from './components/Auth/Logout/Logout';

import * as actions from './store/actions/index';

function App() {

  const isAuthenticated = useSelector(state => state.auth.isAuth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.verifyAuth())
  }, [dispatch])

  return (
    <Fragment>
      <Router>
        <Layout>

          <Switch>

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
              path="/logout"
              render={
                props => isAuthenticated ? (
                  <Logout />
                ) : (
                  <Redirect to="/login" />
                ) } />

            {
              isAuthenticated ? (
                <Redirect to="/color" from="/" />
              ) : (
                <Redirect to="/login" from="/" />
              )
            }

          </Switch>
        </Layout>
      </Router>
    </Fragment>
  );
}

export default App;
