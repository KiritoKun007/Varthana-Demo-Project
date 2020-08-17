import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

import Profile from './Profile/Profile';
import Logout from '../Auth/Logout/Logout';
import Sidebar from '../UI/Sidebar/Sidebar';

import classes from './User.module.css';
import EditProfile from './Profile/EditProfile/EditProfile';

const User = () => {

    let { path } = useRouteMatch();

    console.log(path)

    return (
        <div className={classes.Container}>

            <Sidebar />

            <Switch>
                <Route exact path={path} >
                    <Profile />
                </Route>
                <Route path={`${path}/logout`} component={Logout} />
                <Route path={`${path}/edit`} component={EditProfile} />
            </Switch>
        </div>
    )
}

export default User
