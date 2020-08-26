import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import classes from './Profile.module.css';
import 'react-toastify/dist/ReactToastify.css';

import { useHistory, useRouteMatch } from 'react-router-dom';

import * as actions from '../../../store/actions'

import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

const Profile = () => {

    const user = useSelector(state => state.auth.user)
    const msg = useSelector(state => state.auth.successMsg);

    const dispatch = useDispatch()

    let history = useHistory();
    let { url } = useRouteMatch();

    useEffect(() => {
        if(msg !== '') {
            toast.success(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [msg])
    
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

            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />

            <h4>My Profile</h4>
            <hr/>

            <div className={classes.profileDetails}>
                <div className={classes.subDetail}>
                    <p>Username</p>
                    <p>{user && user.user_name}</p>
                </div>
                <div className={classes.subDetail}>
                    <p>Email</p>
                    <p>{ user && user.user_email}</p>
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
