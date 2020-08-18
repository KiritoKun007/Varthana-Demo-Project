import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import classes from './Profile.module.css';
import { useHistory, useRouteMatch } from 'react-router-dom';

import * as actions from '../../../store/actions'

const Profile = () => {

    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()

    let history = useHistory();
    let { url } = useRouteMatch();

    const { user_name, user_email } = user

    const editProfileHandler = (e) => {
        e.preventDefault()
        history.push(`${url}/edit`)
    }

    const inactiveHandler = (e) => {
        e.preventDefault()

        dispatch(actions.inActiveUser())
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

            <div className={classes.btnContainer}>
                <button onClick={e => editProfileHandler(e)} >Edit</button>
                <button onClick={e => inactiveHandler(e)} >Inactive</button>
            </div>
        </div>
    )
}

export default Profile
