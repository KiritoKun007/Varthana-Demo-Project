import React, { useEffect } from 'react'
import { useRouteMatch, Switch, Route, useHistory } from 'react-router-dom'

import Profile from './Profile/Profile';
import Logout from '../Auth/Logout/Logout';

import classes from './User.module.css';
import EditProfile from './Profile/EditProfile/EditProfile';
import { useSelector } from 'react-redux';

const User = () => {

    let { path } = useRouteMatch();

    const user = useSelector(state => state.auth.user);

    let history = useHistory();

    console.log(path)

    useEffect(() => {
        if(user === 'Not Authorized') {
            history.push('/login');
        }
    }, [user])

    return (
        <div className={classes.Container}>

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
