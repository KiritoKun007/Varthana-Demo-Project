import React from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import * as actions from '../../../../store/actions';

import classes from './EditProfile.module.css';

const EditProfile = () => {

    const user = useSelector(state => state.auth.user)

    let history = useHistory();

    const dispatch = useDispatch()

    const [profileUser, setProfileUser] = useState({
        username: user ? user.user_name: '',
        email: user ? user.user_email: '' 
    })

    const onChangeInput = e => {
        e.preventDefault()

        setProfileUser({
            ...profileUser,
            [e.target.name]: e.target.value
        })
    }

    const cancelEditHandler = (e) => {
        e.preventDefault()
        history.goBack()
    } 

    const saveProfileHandler = (e) => {
        e.preventDefault();

        dispatch(actions.editUser(profileUser)).then(res => {
            history.push("/user")
        })
    }

    return (
        <div className={classes.container}>
            <h4>Edit Profile</h4>
            <hr/>

            <form className={classes.editProfileForm}>
                <div className={classes.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username"
                        value={profileUser.username}
                        onChange={e => onChangeInput(e)} />
                </div>

                <div className={classes.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        value={profileUser.email}
                        onChange={e => onChangeInput(e)} />
                </div>

                <div className={classes.btnContainer}>
                    <button 
                        className={classes.save}
                        onClick={e => saveProfileHandler(e)} >Save</button>
                    <button 
                        className={classes.cancel} 
                        onClick={e => cancelEditHandler(e)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile
