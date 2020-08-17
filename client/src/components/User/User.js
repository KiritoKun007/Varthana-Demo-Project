import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

import Profile from './Profile/Profile';
import Logout from '../Auth/Logout/Logout';
import Sidebar from '../UI/Sidebar/Sidebar';

import classes from './User.module.css';

const User = () => {

    let { path } = useRouteMatch();

    console.log(path)

    return (
        <div className={classes.Container}>

            <Sidebar />

            <Switch>
                <Route path={`${path}/logout`} >
                    <Logout />
                </Route>
                <Route exact path={path} >
                    <Profile />
                </Route>
            </Switch>
        </div>
    )
}

export default User
