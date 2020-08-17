import React from 'react'
import { useSelector } from 'react-redux'

import classes from './Profile.module.css';
import { useHistory, useRouteMatch } from 'react-router-dom';

const Profile = () => {

    const user = useSelector(state => state.auth.user)

    let history = useHistory();
    let { url } = useRouteMatch();

    const { user_name, user_email } = user

    const editProfileHandler = (e) => {
        e.preventDefault()
        history.push(`${url}/edit`)
    }

    return (
        <div className={classes.profileContainer}>

            <h4>My Profile</h4>
            <hr/>

            <div className={classes.profileDetails}>
                <div className={classes.subDetail}>
                    <p>Username</p>
                    <p>{user_name}</p>
                </div>
                <div className={classes.subDetail}>
                    <p>Email</p>
                    <p>{user_email}</p>
                </div>
            </div>

            <button onClick={e => editProfileHandler(e)} >Edit</button>
        </div>
    )
}

export default Profile
