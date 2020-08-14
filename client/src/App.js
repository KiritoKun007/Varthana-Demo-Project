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
import { useState } from 'react';

import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import { useSelector } from 'react-redux';

function App() {

  const isAuthenticated = useSelector(state => state.auth.isAuth)

  const setAuth = (bool) => {
    // setIsAuthenticated(bool)
  }

  // const isAuth = async () => {
  //   try {

  //     const response = await fetch("http://localhost:5000/auth/verify", {
  //       method: "GET",
  //       headers: {
  //         token: localStorage.token
  //       }
  //     })      

  //     const resData = await response.json();

  //     resData === true ? setIsAuthenticated(true): setIsAuthenticated(false);
      
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  // }

  useEffect(() => {
    // isAuth()
  }, [])

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
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/color" />
                ) } />

            <Route
              exact
              path="/register"
              render={props => 
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
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
